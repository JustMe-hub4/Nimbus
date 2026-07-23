import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSensorProfiles1700000000016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE sensor_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) UNIQUE NOT NULL,
        manufacturer VARCHAR(100),
        model VARCHAR(100),
        communication_protocol VARCHAR(50),
        supported_measurement_type_ids JSONB DEFAULT '[]',
        sampling_interval INTEGER,
        operating_voltage VARCHAR(20),
        calibration_required BOOLEAN DEFAULT false,
        calibration_instructions TEXT,
        accuracy FLOAT,
        precision FLOAT,
        documentation_url TEXT,
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
    await queryRunner.query(`DROP TABLE sensor_profiles;`);
  }
}
