import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefineMeasurementTypesAndUnits1700000000017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add dimension to units
    await queryRunner.query(`
      ALTER TABLE units ADD COLUMN IF NOT EXISTS dimension VARCHAR(50);
    `);

    // Add min_value and max_value to measurement_types
    await queryRunner.query(`
      ALTER TABLE measurement_types ADD COLUMN IF NOT EXISTS min_value DOUBLE PRECISION;
      ALTER TABLE measurement_types ADD COLUMN IF NOT EXISTS max_value DOUBLE PRECISION;
    `);

    // Add code column
    await queryRunner.query(`
      ALTER TABLE measurement_types ADD COLUMN IF NOT EXISTS code VARCHAR(50) UNIQUE;
    `);

    // Populate code from name (slugify)
    await queryRunner.query(`
      UPDATE measurement_types
      SET code = LOWER(REPLACE(REPLACE(name, ' ', '_'), '-', '_'))
      WHERE code IS NULL;
    `);

    // Make code NOT NULL
    await queryRunner.query(`
      ALTER TABLE measurement_types ALTER COLUMN code SET NOT NULL;
    `);

    // Drop valid_range
    await queryRunner.query(`
      ALTER TABLE measurement_types DROP COLUMN IF EXISTS valid_range;
    `);

    // Add check constraint min <= max
    await queryRunner.query(`
      ALTER TABLE measurement_types ADD CONSTRAINT check_min_max
      CHECK (min_value IS NULL OR max_value IS NULL OR min_value <= max_value);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE measurement_types DROP CONSTRAINT check_min_max;`);
    await queryRunner.query(`ALTER TABLE measurement_types ADD COLUMN valid_range JSONB;`);
    await queryRunner.query(`ALTER TABLE measurement_types DROP COLUMN code;`);
    await queryRunner.query(`ALTER TABLE measurement_types DROP COLUMN min_value;`);
    await queryRunner.query(`ALTER TABLE measurement_types DROP COLUMN max_value;`);
    await queryRunner.query(`ALTER TABLE units DROP COLUMN dimension;`);
  }
}
