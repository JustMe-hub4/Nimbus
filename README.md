# Nimbus Platform

Industrial IoT Platform with environmental monitoring as the first module.

## Overview

 nimbus Platform is a production-grade IoT platform designed to support multiple domains beyond weather monitoring. Built with a platform-first architecture, it provides device registry, telemetry ingestion, alerting, and developer APIs.

## Architecture

- **Monorepo**: Turborepo for unified development
- **Domain-Driven Design**: Explicit domain boundaries (identity, tenancy, assets, telemetry, alerts)
- **Event-Driven**: Internal event bus with proper domain events
- **Multi-Tenant**: Organization-based SaaS architecture
- **Time-Series**: PostgreSQL + TimescaleDB for telemetry optimization

## Technology Stack

### Backend
- Node.js 22 LTS
- Express + TypeScript
- Prisma ORM
- BullMQ (job scheduling)
- MQTT.js
- Pino (logging)

### Database
- PostgreSQL 16
- TimescaleDB extension
- Redis 7

### Frontend
- React 19 + TypeScript
- Vite
- shadcn/ui
- TanStack Query

### Infrastructure
- Docker + Docker Compose
- Turborepo
- GitHub Actions

## Repository Structure

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

## Getting Started

### Prerequisites

- Node.js 22+
- Docker & Docker Compose
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Start infrastructure services
docker compose up -d

# Start development
npm run dev
```

### Services

- **API**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **MQTT**: localhost:1883
- **Adminer**: http://localhost:8080

## Development

### Available Scripts

```bash
npm run build          # Build all packages
npm run dev            # Start development servers
npm run lint           # Lint all packages
npm run test           # Run all tests
npm run clean          # Clean build artifacts
npm run format         # Format code with Prettier
```

### Package Scripts

```bash
# Backend API
cd apps/backend-api
npm run dev            # Start API server
npm run build          # Build for production
npm run test           # Run tests

# Contracts package
cd packages/contracts
npm run build          # Build TypeScript
```

## Documentation

- [Architecture Decisions](docs/adr/README.md)
- [API Documentation](docs/api/README.md)
- [Developer Guide](docs/developer/README.md)
- [Implementation Plan](.windsurf/plans/nimbus-platform-implementation-5ee635.md)

## v1 Scope

The following capabilities are included in v1:

1. Platform Foundation
2. Identity & Authentication
3. Tenant Management
4. Asset Management
5. Telemetry Ingestion
6. Monitoring Dashboard
7. Alerts & Notifications
8. Basic Reporting
9. Observability

## Future Capabilities

- Mobile Application (Flutter)
- Developer Experience (API keys, webhooks, SDK generation)
- Device Authentication (certificates)
- OTA firmware deployment
- AI forecasting
- Digital twins
- Plugin system

## License

Proprietary - All rights reserved

## Contributing

See [DEFINITION_OF_DONE.md](.windsurf/plans/DEFINITION_OF_DONE-5ee635.md) for contribution guidelines.
