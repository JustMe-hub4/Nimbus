import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefineSensorProfiles1700000000018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create join table for sensor_profile_measurement_types
    await queryRunner.query(`
      CREATE TABLE sensor_profile_measurement_types (
        sensor_profile_id UUID NOT NULL REFERENCES sensor_profiles(id) ON DELETE CASCADE,
        measurement_type_id UUID NOT NULL REFERENCES measurement_types(id) ON DELETE RESTRICT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        PRIMARY KEY (sensor_profile_id, measurement_type_id)
      );
    `);

    // 2. Migrate existing data from JSONB to join table
    // (if there are any rows with non‑empty arrays)
    await queryRunner.query(`
      INSERT INTO sensor_profile_measurement_types (sensor_profile_id, measurement_type_id)
      SELECT 
        sp.id,
        jsonb_array_elements_text(sp.supported_measurement_type_ids)::uuid
      FROM sensor_profiles sp
      WHERE sp.supported_measurement_type_ids IS NOT NULL
        AND jsonb_array_length(sp.supported_measurement_type_ids) > 0;
    `);

    // 3. Drop the JSONB column
    await queryRunner.query(`
      ALTER TABLE sensor_profiles DROP COLUMN IF EXISTS supported_measurement_type_ids;
    `);

    // 4. Add new columns
    await queryRunner.query(`
      ALTER TABLE sensor_profiles
      ADD COLUMN IF NOT EXISTS communication_protocol VARCHAR(50),
      ADD COLUMN IF NOT EXISTS accuracy_value DOUBLE PRECISION,
      ADD COLUMN IF NOT EXISTS accuracy_unit VARCHAR(20),
      ADD COLUMN IF NOT EXISTS accuracy_condition TEXT,
      ADD COLUMN IF NOT EXISTS precision_value DOUBLE PRECISION,
      ADD COLUMN IF NOT EXISTS precision_unit VARCHAR(20);
    `);

    // 5. Rename documentation_url to datasheet_url
    await queryRunner.query(`
      ALTER TABLE sensor_profiles
      RENAME COLUMN documentation_url TO datasheet_url;
    `);

    // 6. Add CHECK constraint for communication_protocol
    await queryRunner.query(`
      ALTER TABLE sensor_profiles
      ADD CONSTRAINT chk_communication_protocol
      CHECK (communication_protocol IS NULL OR communication_protocol IN (
        'I2C', 'SPI', 'UART', 'RS485', 'MODBUS', 'CAN', 'MQTT', 
        'LoRaWAN', 'BLE', 'ZIGBEE', 'THREAD', 'USB'
      ));
    `);

    // 7. Drop old columns if they still exist (they were removed earlier)
    // (no need – we already removed them)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert changes
    await queryRunner.query(`ALTER TABLE sensor_profiles RENAME COLUMN datasheet_url TO documentation_url;`);
    await queryRunner.query(`ALTER TABLE sensor_profiles DROP COLUMN IF EXISTS precision_unit;`);
    await queryRunner.query(`ALTER TABLE sensor_profiles DROP COLUMN IF EXISTS precision_value;`);
    await queryRunner.query(`ALTER TABLE sensor_profiles DROP COLUMN IF EXISTS accuracy_condition;`);
    await queryRunner.query(`ALTER TABLE sensor_profiles DROP COLUMN IF EXISTS accuracy_unit;`);
    await queryRunner.query(`ALTER TABLE sensor_profiles DROP COLUMN IF EXISTS accuracy_value;`);
    await queryRunner.query(`ALTER TABLE sensor_profiles DROP COLUMN IF EXISTS communication_protocol;`);
    await queryRunner.query(`ALTER TABLE sensor_profiles ADD COLUMN supported_measurement_type_ids JSONB DEFAULT '[]';`);
    await queryRunner.query(`DROP TABLE sensor_profile_measurement_types;`);
  }
}
