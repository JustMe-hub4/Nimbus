# ADR-001: Monorepo Architecture with Turborepo

## Status

Accepted

## Context

The Nimbus Platform requires multiple applications (backend-api, worker, mqtt-consumer, dashboard, mobile) and shared packages (contracts, validation, domain-events, api-client). Managing these as separate repositories would introduce:

- Code duplication across applications
- Inconsistent tooling and configurations
- Difficult cross-package changes
- Complex dependency management
- Fragmented CI/CD pipelines

We need a unified development environment that allows code sharing while maintaining clear boundaries between applications.

## Decision

Adopt a monorepo architecture using Turborepo for the following reasons:

### Repository Structure
```
nimbus-platform/
├── apps/           # Application code
├── packages/       # Shared packages
├── docs/           # Documentation
├── docker/         # Docker configurations
└── .github/        # CI/CD
```

### Shared Packages
- **contracts**: TypeScript interfaces and types shared across all apps
- **validation**: Zod schemas for input validation
- **domain-events**: Domain event definitions with proper metadata
- **api-client**: Typed API client for backend communication
- **shared-config**: ESLint, Prettier, TypeScript configurations

### Tooling
- **Turborepo**: Build system and task orchestration
- **npm workspaces**: Dependency management
- **Docker Compose**: Local development environment

### Benefits
1. **Single Source of Truth**: Contracts package ensures type consistency across all apps
2. **Shared Tooling**: Consistent linting, formatting, and TypeScript configuration
3. **Atomic Commits**: Changes across packages can be committed together
4. **Simplified CI**: Single pipeline for all packages
5. **Local Development**: One command to start entire stack

## Consequences

### Positive
- Eliminates type duplication between backend, dashboard, and mobile
- Consistent code quality across all packages
- Easier refactoring across package boundaries
- Simplified onboarding for new developers
- Better visibility into the entire codebase

### Negative
- Larger repository size
- Longer CI times (mitigated by Turborepo caching)
- Requires understanding of monorepo tooling
- Potential for tighter coupling if boundaries aren't respected

### Mitigations
- Clear separation between apps and packages
- Strict dependency rules (apps depend on packages, not vice versa)
- Turborepo caching to optimize build times
- Documentation on package boundaries and responsibilities

## Alternatives Considered

### Separate Repositories
- **Pros**: Smaller repositories, independent versioning
- **Cons**: Code duplication, complex cross-repo changes, inconsistent tooling
- **Rejected**: Duplication cost outweighs benefits for our use case

### Nx
- **Pros**: More features, better generators
- **Cons**: More complex, steeper learning curve
- **Rejected**: Turborepo provides sufficient features with simpler setup

### Lerna
- **Pros**: Mature, widely used
- **Cons**: Being phased out in favor of Turborepo
- **Rejected**: Turborepo is the future of the ecosystem

## References

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Monorepo Best Practices](https://monorepo.tools/)
