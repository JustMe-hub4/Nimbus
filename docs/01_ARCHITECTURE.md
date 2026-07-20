# Nimbus Platform Architecture

**Version:** 1.0.0

**Status:** Approved

**Last Updated:** 2026-07-17

---

# Architecture Overview

Nimbus is a production-grade Industrial IoT (IIoT) Platform built with a platform-first architecture. The platform provides device registry, telemetry ingestion, alerting, and developer APIs as foundational capabilities, with domain-specific functionality built on top.

---

# Core Architectural Principles

## Platform-First Design

Nimbus is not a weather station application. It is a platform that supports multiple IoT domains. The Weather Station is the first supported device profile, not the platform itself.

## Domain-Driven Design (DDD)

The platform is organized around business domains with clear boundaries:

- **Identity**: Users, authentication, authorization
- **Tenancy**: Organizations, multi-tenancy
- **Assets**: Stations, devices, sensors
- **Telemetry**: Data ingestion, storage, querying
- **Alerts**: Rules, notifications, escalation
- **Platform**: Caching, events, observability

## Event-Driven Architecture

Internal communication uses domain events with proper metadata:

- `eventId`: Unique identifier
- `occurredAt`: Timestamp
- `version`: Event schema version
- `correlationId`: Request tracing
- `payload`: Event data

## Multi-Tenancy

Organization-based SaaS architecture with tenant isolation at the data and API levels.

---

# System Architecture

## Monorepo Structure

```
nimbus-platform/
├── apps/
│   ├── backend-api/      # Node.js API server
│   ├── worker/           # Background job processor
│   ├── mqtt-consumer/    # MQTT message processor (stateless)
│   ├── dashboard/        # React admin dashboard
│   ├── mobile/           # Flutter mobile app
│   └── firmware/         # Arduino/ESP firmware
├── packages/
│   ├── contracts/        # Shared TypeScript interfaces
│   ├── validation/       # Shared Zod schemas
│   ├── domain-events/    # Domain event definitions
│   ├── api-client/       # Typed API SDK
│   └── shared-config/    # Shared ESLint, Prettier, TSConfig
├── docs/
│   ├── adr/              # Architecture Decision Records
│   ├── api/              # API documentation
│   └── developer/       # Developer guides
└── docker/               # Docker configurations
```

## Technology Stack

### Backend
- **Runtime**: Node.js 22 LTS
- **Framework**: Express + TypeScript
- **ORM**: Prisma
- **Job Scheduling**: BullMQ
- **Messaging**: MQTT.js
- **Logging**: Pino

### Database
- **Primary**: PostgreSQL 16
- **Time-Series**: TimescaleDB extension
- **Cache**: Redis 7

### Frontend
- **Framework**: React 19 + TypeScript
- **Build**: Vite
- **Components**: shadcn/ui
- **State**: TanStack Query

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Build System**: Turborepo
- **CI/CD**: GitHub Actions

---

# Key Architectural Decisions

## ADR-001: Monorepo Architecture

**Decision**: Use Turborepo for monorepo management with shared packages.

**Rationale**: Eliminates code duplication, ensures consistent tooling, enables atomic commits across packages.

## ADR-002: Authentication Strategy

**Decision**: JWT access tokens (15min) + refresh tokens (7days) with rotation, Redis for session management.

**Rationale**: Production-grade security with short-lived tokens and secure refresh mechanism.

## ADR-003: Multi-Tenancy Strategy

**Decision**: Organization-based multi-tenancy with tenant isolation middleware.

**Rationale**: SaaS-ready architecture with clear data separation between organizations.

## ADR-004: Device Registry Design

**Decision**: Generic Device entity with DeviceProfile templates for device families.

**Rationale**: Extensible to any IoT domain, not limited to weather stations.

## ADR-005: Event-Driven Architecture

**Decision**: In-process event bus with proper domain events (eventId, occurredAt, version, correlationId).

**Rationale**: Loose coupling between domains, easy to scale to distributed events later.

## ADR-006: Background Job Strategy

**Decision**: BullMQ with Redis for job scheduling, separate worker process.

**Rationale**: Scalable processing without blocking API, supports retries and scheduling.

## ADR-008: MQTT Consumer Stateless Design

**Decision**: MQTT consumer validates, authenticates, and publishes events only - no business logic.

**Rationale**: Thin ingestion layer, scalable, clear separation of concerns.

## ADR-014: API Versioning Strategy

**Decision**: Version in URL path (/api/v1/), not headers.

**Rationale**: Clear versioning, easier routing, standard practice.

---

# Domain Boundaries

## Identity Domain

**Responsibilities**:
- User registration and authentication
- JWT token generation and validation
- Role-based access control (RBAC)
- Password management

**Entities**: User, Role, Permission

## Tenancy Domain

**Responsibilities**:
- Organization management
- Tenant isolation
- Organization membership
- Billing and subscription

**Entities**: Organization, Membership, Subscription

## Assets Domain

**Responsibilities**:
- Station management
- Device registration
- Sensor configuration
- Device health monitoring

**Entities**: Station, Device, DeviceProfile, Sensor

## Telemetry Domain

**Responsibilities**:
- Data ingestion from devices
- Time-series storage
- Historical querying
- Data quality validation

**Entities**: Telemetry, TelemetryQuery, DataQuality

## Alerts Domain

**Responsibilities**:
- Alert rule configuration
- Real-time evaluation
- Notification delivery
- Escalation management

**Entities**: AlertRule, Alert, Notification, Escalation

## Platform Domain

**Responsibilities**:
- Caching layer
- Event bus
- Observability
- Configuration management

**Entities**: Cache, Event, Metric, HealthCheck

---

# Data Flow

## Telemetry Ingestion Flow

1. Device publishes telemetry via MQTT
2. MQTT consumer validates and authenticates message
3. Consumer publishes `TelemetryReceived` event
4. Telemetry service processes event
5. Data stored in TimescaleDB
6. Alert rules evaluated
7. Notifications sent if thresholds exceeded

## Authentication Flow

1. User submits credentials
2. Backend validates against database
3. Password verified using argon2
4. JWT access token generated (15min expiry)
5. Refresh token generated (7day expiry)
6. Tokens stored in Redis
7. Tokens returned to client

## API Request Flow

1. Client sends request with JWT
2. Middleware validates token
3. Tenant context extracted
4. Correlation ID generated/propagated
5. Request routed to appropriate domain service
6. Response returned with correlation ID header

---

# Security Architecture

## Authentication

- JWT access tokens (15min expiry)
- Refresh tokens (7day expiry)
- Token rotation on refresh
- Redis-based session management
- Argon2 password hashing

## Authorization

- Role-based access control (RBAC)
- Organization-level permissions
- Resource-level ownership checks
- Tenant isolation middleware

## Data Security

- TLS in transit
- Encryption at rest (database)
- Tenant data isolation
- Audit logging for sensitive operations

---

# Scalability Architecture

## Horizontal Scaling

- Stateless API servers
- Separate worker processes
- MQTT consumer scaling
- Database connection pooling

## Vertical Scaling

- TimescaleDB for time-series optimization
- Redis caching layer
- Database read replicas (future)

## Caching Strategy

- Redis for session data
- Redis for frequently accessed entities
- Application-level caching for computed results

---

# Observability

## Logging

- Structured logging with Pino
- Correlation ID propagation
- Log levels: error, warn, info, debug
- Sensitive data redaction

## Metrics

- Request latency
- Error rates
- Active connections
- Queue depths
- Database performance

## Health Checks

- `/api/v1/health` - Service health
- `/api/v1/health/ready` - Dependency health
- Database connectivity
- Redis connectivity
- MQTT connectivity

---

# API Design

## RESTful Principles

- Resource-based URLs
- HTTP verbs for operations
- Status codes for responses
- Consistent error format

## Versioning

- URL path versioning: `/api/v1/`
- Backward compatibility within major version
- Deprecation headers for breaking changes

## Response Format

```json
{
  "data": { ... },
  "meta": {
    "correlationId": "string",
    "timestamp": "ISO8601"
  }
}
```

## Error Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": { ... }
  },
  "meta": {
    "correlationId": "string",
    "timestamp": "ISO8601"
  }
}
```

---

# Deployment Architecture

## Development

- Docker Compose for local services
- Hot reload with tsx
- Shared configuration packages

## Production

- Containerized deployment
- Load balancer for API servers
- Managed PostgreSQL (RDS/Azure SQL)
- Managed Redis (ElastiCache/Azure Cache)
- Managed MQTT (AWS IoT Core/Azure IoT Hub)

---

# Migration Strategy

## Database Migrations

- Prisma migrations
- Version-controlled schema changes
- Backward-compatible migrations
- Rollback procedures

## API Migrations

- Versioned endpoints
- Deprecation period
- Breaking change documentation
- Client migration guides

---

# Architecture Governance

## ADR Process

1. Propose architectural decision
2. Document context and alternatives
3. Review with team
4. Accept or reject
5. Implement if accepted
6. Update architecture documentation

## Code Review Criteria

- Adherence to architectural principles
- Domain boundary compliance
- Security best practices
- Performance considerations
- Test coverage

## Technical Debt Process

- Document before implementation
- Assess impact and risk
- Plan remediation
- Track in project backlog
- Review regularly

---

# Future Considerations

## API Gateway

- Consider for v2 when multiple services exist
- Benefits: routing, rate limiting, auth consolidation
- Trade-offs: additional infrastructure, complexity

## Microservices

- Current: Monolithic backend with clear domain boundaries
- Future: Extract domains to services if needed
- Trigger: Team scaling, deployment complexity

## Event Sourcing

- Current: Event-driven with state persistence
- Future: Consider for audit-critical domains
- Trade-offs: Complexity, replay capability

---

# References

- [ADR Index](./adr/README.md)
- [PROJECT_STATE](./00_PROJECT_STATE.md)
- [ENGINEERING_PRINCIPLES](./02_ENGINEERING_PRINCIPLES.md)
- [CODING_STANDARDS](./03_CODING_STANDARDS.md)
