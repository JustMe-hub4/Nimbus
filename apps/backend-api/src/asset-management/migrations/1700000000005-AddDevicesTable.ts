import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDevicesTable1700000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE devices (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        organization_id UUID NOT NULL,
        station_id UUID NOT NULL,
        device_profile_id UUID,
        name VARCHAR(255) NOT NULL,
        serial_number VARCHAR(255) UNIQUE NOT NULL,
        firmware_version VARCHAR(50),
        hardware_revision VARCHAR(50),
        heartbeat_interval INTEGER,
        last_heartbeat TIMESTAMPTZ,
        status VARCHAR(50) DEFAULT 'OFFLINE',
        metadata JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        deleted_at TIMESTAMPTZ,
        created_by UUID,
        updated_by UUID,
        deleted_by UUID,
        CONSTRAINT fk_device_organization FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
        CONSTRAINT fk_device_station FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE devices;`);
  }
}
