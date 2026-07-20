# Nimbus Platform

## Project State

**Status:** Active Development

**Version:** 0.1.0

**Current Phase:** Phase 2 – Core Platform

**Architecture Status:** Approved

**Last Updated:** 2026-07-17

---

# Project Vision

Nimbus is a production-grade Industrial IoT (IIoT) Platform designed for extensibility, scalability, security, and long-term maintainability.

The Weather Station is the first supported device profile.

Nimbus itself is **not** a weather station application.

---

# Current Objective

Complete the Core Platform before implementing Weather Station functionality.

Priority order:

1. Platform Foundation ✅
2. Database Design
3. Authentication
4. Device Registry
5. Telemetry Pipeline
6. Alert Engine
7. Dashboard
8. Mobile Application

---

# Current Capability

Database Schema Design

Status:

🟡 In Progress

Owner:

Database Team

---

# Completed Capabilities

## Platform Foundation

Status: Complete

Includes:

- Monorepo
- Turborepo
- Docker Compose
- Shared Packages
- Backend Skeleton
- Shared Contracts
- Validation Library
- Domain Events
- API Client
- Shared Configuration

---

# Active Branch

feature/database-schema

---

# Current Technology Stack

Backend

- Node.js
- TypeScript
- Express

Database

- PostgreSQL
- TimescaleDB
- Prisma ORM

Messaging

- MQTT (Mosquitto)

Cache

- Redis

Dashboard

- React
- TypeScript
- Vite

Mobile

- Flutter

Infrastructure

- Docker
- GitHub Actions

---

# Current Domains

Implemented

- Contracts
- Validation
- Domain Events

Design Phase

- Identity
- Organizations
- Stations
- Devices
- Sensors
- Telemetry
- Alerts
- Firmware

Not Started

- Dashboard
- Mobile
- Analytics
- Reports

---

# Repository Structure

apps/

packages/

docs/

docker/

.github/

---

# Approved ADRs

- ADR-001 Monorepo Architecture
- ADR-002 Technology Stack
- ADR-003 Multi-Tenant Architecture

---

# Known Technical Debt

None

Technical debt must be explicitly documented before implementation.

Hidden technical debt is prohibited.

---

# Current Risks

None

If architectural risks are identified, they must be documented before implementation continues.

---

# Current Blockers

None

---

# Upcoming Milestones

- Prisma Schema
- Database Migrations
- Authentication
- Repository Layer
- REST API
- MQTT Integration

---

# Definition of Ready

A capability is ready when:

- Architecture exists
- Scope approved
- Dependencies identified
- Acceptance criteria defined

---

# Definition of Done

A capability is complete when:

- Builds successfully
- Lints successfully
- Tests pass
- Documentation updated
- PROJECT_STATE updated
- Reviewed and approved

---

# AI Agent Instructions

Every AI agent must read this document before beginning work.

Use this document to determine:

- Current phase
- Current capability
- Existing architecture
- Completed work
- Remaining work

If your assigned task conflicts with this document, stop implementation and report the conflict.

Never assume the project state.

Always trust this document.

---

# Update Policy

This file must be updated after every successful merge.

It is the single source of truth describing the current state of the project.

No implementation is considered complete until PROJECT_STATE.md has been updated.
