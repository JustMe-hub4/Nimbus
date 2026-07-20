"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialIdentitySchema1700000000000 = void 0;
class InitialIdentitySchema1700000000000 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pg_uuidv7";`);
        await queryRunner.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        deleted_at TIMESTAMPTZ,
        created_by UUID,
        updated_by UUID,
        deleted_by UUID
      );
    `);
        await queryRunner.query(`
      CREATE TABLE organizations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        deleted_at TIMESTAMPTZ,
        created_by UUID,
        updated_by UUID,
        deleted_by UUID
      );
    `);
        await queryRunner.query(`
      CREATE TABLE roles (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
        name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
        await queryRunner.query(`
      CREATE TABLE permissions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
        await queryRunner.query(`
      CREATE TABLE role_permissions (
        role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
        permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
        PRIMARY KEY (role_id, permission_id)
      );
    `);
        await queryRunner.query(`
      CREATE TABLE memberships (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
        role_id UUID REFERENCES roles(id),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        deleted_at TIMESTAMPTZ,
        created_by UUID,
        updated_by UUID,
        deleted_by UUID,
        UNIQUE (user_id, organization_id)
      );
    `);
        await queryRunner.query(`
      CREATE TABLE refresh_tokens (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
        token_hash TEXT NOT NULL UNIQUE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        expires_at TIMESTAMPTZ NOT NULL,
        revoked BOOLEAN DEFAULT false,
        replaced_by_token_id UUID,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        created_by UUID
      );
    `);
        await queryRunner.query(`CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;`);
        await queryRunner.query(`CREATE INDEX idx_orgs_slug ON organizations(slug) WHERE deleted_at IS NULL;`);
        await queryRunner.query(`CREATE INDEX idx_memberships_user_org ON memberships(user_id, organization_id) WHERE deleted_at IS NULL;`);
        await queryRunner.query(`CREATE INDEX idx_refresh_token_hash ON refresh_tokens(token_hash);`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS refresh_tokens;`);
        await queryRunner.query(`DROP TABLE IF EXISTS memberships;`);
        await queryRunner.query(`DROP TABLE IF EXISTS role_permissions;`);
        await queryRunner.query(`DROP TABLE IF EXISTS permissions;`);
        await queryRunner.query(`DROP TABLE IF EXISTS roles;`);
        await queryRunner.query(`DROP TABLE IF EXISTS organizations;`);
        await queryRunner.query(`DROP TABLE IF EXISTS users;`);
    }
}
exports.InitialIdentitySchema1700000000000 = InitialIdentitySchema1700000000000;
//# sourceMappingURL=1700000000000-InitialIdentitySchema.js.map