import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeviceProfiles1700000000008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE device_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        manufacturer VARCHAR(255),
        model VARCHAR(255),
        communication_protocols JSONB DEFAULT '[]',
        supported_sensor_types JSONB DEFAULT '[]',
        expected_measurements JSONB DEFAULT '[]',
        firmware_compatibility JSONB DEFAULT '[]',
        heartbeat_default_interval INTEGER DEFAULT 60,
        calibration_required BOOLEAN DEFAULT false,
        calibration_instructions TEXT,
        metadata JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        deleted_at TIMESTAMPTZ,
        created_by UUID,
        updated_by UUID,
        deleted_by UUID
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE device_profiles;`);
  }
}
