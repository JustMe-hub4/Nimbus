import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUnitToDefaultUnitId1700000000015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Rename unit column to default_unit_id
    await queryRunner.query(`
      ALTER TABLE measurement_types RENAME COLUMN unit TO default_unit_id;
    `);
    // Drop min_value and max_value columns
    await queryRunner.query(`
      ALTER TABLE measurement_types DROP COLUMN IF EXISTS min_value;
      ALTER TABLE measurement_types DROP COLUMN IF EXISTS max_value;
    `);
    // Add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE measurement_types ADD CONSTRAINT fk_measurement_type_unit FOREIGN KEY (default_unit_id) REFERENCES units(id) ON DELETE RESTRICT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE measurement_types DROP CONSTRAINT IF EXISTS fk_measurement_type_unit;
      ALTER TABLE measurement_types RENAME COLUMN default_unit_id TO unit;
      ALTER TABLE measurement_types ADD COLUMN min_value DOUBLE PRECISION;
      ALTER TABLE measurement_types ADD COLUMN max_value DOUBLE PRECISION;
    `);
  }
}
