import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoryToMeasurementTypes1700000000014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE measurement_types ADD COLUMN IF NOT EXISTS category VARCHAR(50) NOT NULL DEFAULT 'Unknown';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE measurement_types DROP COLUMN IF EXISTS category;
    `);
  }
}
