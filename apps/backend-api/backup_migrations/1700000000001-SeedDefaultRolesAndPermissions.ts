import { MigrationInterface, QueryRunner } from 'typeorm';
import { PERMISSIONS } from '../../shared/constants/permissions';
import { DEFAULT_ROLES } from '../../shared/constants/roles';

export class SeedDefaultRolesAndPermissions1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert Permissions
    const permissions = Object.values(PERMISSIONS);
    for (const perm of permissions) {
      await queryRunner.query(
        `INSERT INTO permissions (name, description) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING`,
        [perm, `Permission to ${perm.replace(':', ' ')}`],
      );
    }

    // Insert Roles
    const roles = {
      [DEFAULT_ROLES.ADMIN]: 'Full control over the organization',
      [DEFAULT_ROLES.MEMBER]: 'Can manage stations, devices, and alerts',
      [DEFAULT_ROLES.VIEWER]: 'Read-only access to telemetry and dashboards',
    };
    for (const [name, desc] of Object.entries(roles)) {
      await queryRunner.query(
        `INSERT INTO roles (name, description) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING`,
        [name, desc],
      );
    }

    // Admin gets all permissions
    const adminRoleId = await queryRunner.query(`SELECT id FROM roles WHERE name = $1`, [DEFAULT_ROLES.ADMIN]);
    const allPerms = await queryRunner.query(`SELECT id FROM permissions`);
    for (const perm of allPerms) {
      await queryRunner.query(
        `INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [adminRoleId[0].id, perm.id],
      );
    }

    // Member gets subset
    const memberRoleId = await queryRunner.query(`SELECT id FROM roles WHERE name = $1`, [DEFAULT_ROLES.MEMBER]);
    const memberPerms = [
      PERMISSIONS.STATION_CREATE,
      PERMISSIONS.STATION_UPDATE,
      PERMISSIONS.DEVICE_REGISTER,
      PERMISSIONS.DEVICE_UPDATE,
      PERMISSIONS.TELEMETRY_VIEW,
      PERMISSIONS.ALERT_CONFIGURE,
      PERMISSIONS.ALERT_VIEW,
    ];
    for (const name of memberPerms) {
      const perm = await queryRunner.query(`SELECT id FROM permissions WHERE name = $1`, [name]);
      if (perm.length) {
        await queryRunner.query(
          `INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [memberRoleId[0].id, perm[0].id],
        );
      }
    }

    // Viewer gets only telemetry:view and alert:view
    const viewerRoleId = await queryRunner.query(`SELECT id FROM roles WHERE name = $1`, [DEFAULT_ROLES.VIEWER]);
    const viewerPerms = [PERMISSIONS.TELEMETRY_VIEW, PERMISSIONS.ALERT_VIEW];
    for (const name of viewerPerms) {
      const perm = await queryRunner.query(`SELECT id FROM permissions WHERE name = $1`, [name]);
      if (perm.length) {
        await queryRunner.query(
          `INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [viewerRoleId[0].id, perm[0].id],
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM role_permissions;`);
    await queryRunner.query(`DELETE FROM permissions;`);
    await queryRunner.query(`DELETE FROM roles;`);
  }
}
