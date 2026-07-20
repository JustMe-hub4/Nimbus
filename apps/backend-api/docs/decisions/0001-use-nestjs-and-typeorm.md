# ADR 0001: Use NestJS and TypeORM for Backend

**Date:** 2026-07-18  
**Status:** Accepted  

## Context
Nimbus is a long‑lived IoT platform requiring maintainable, testable, and scalable backend services. We needed a Node.js framework and ORM that support:
- Modular architecture with clear boundaries (hexagonal/clean).
- Strong TypeScript integration.
- Database abstraction with PostgreSQL/TimescaleDB.
- Migration management.
- Developer productivity and community support.

## Decision
We adopt **NestJS** as the application framework and **TypeORM** as the ORM.

### Why NestJS?
- **Dependency Injection** – built‑in DI container encourages testable, decoupled code.
- **Modularity** – modules allow clear separation of capabilities (Identity, Asset Management, etc.).
- **Decorator‑based** – routes, guards, and interceptors are declarative and consistent.
- **Framework‑agnostic** – can use Express or Fastify under the hood.
- **TypeScript‑first** – full type safety and compatibility with our architecture.

### Why TypeORM?
- **Repository pattern** – aligns with our hexagonal architecture by providing an abstraction over the database.
- **Active Record & Data Mapper** – flexibility to choose.
- **Migrations** – version‑controlled schema changes.
- **TimescaleDB support** – we will use it for time‑series data.
- **Active community** – widely adopted, many resources available.

## Consequences
- **Positive:** Clear separation of concerns; the framework is an implementation detail.
- **Positive:** Strong typing and IDE support.
- **Neutral:** Slight learning curve for new developers.
- **Negative:** TypeORM can have performance quirks; we will use raw SQL for complex queries when necessary.
- **Negative:** Some developers may prefer Prisma; we will document our patterns to avoid confusion.

## Compliance
This decision supports Nimbus's goal of being a reference implementation for engineering best practices.
