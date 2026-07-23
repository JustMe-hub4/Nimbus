import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterMeasurementTypesAddFields1700000000010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE measurement_types
      ADD COLUMN valid_range JSONB,
      ADD COLUMN precision INTEGER,
      ADD COLUMN aggregation_strategy VARCHAR(50),
      ADD COLUMN semantic_description TEXT,
      ADD COLUMN embedding_eligible BOOLEAN DEFAULT false,
      ADD COLUMN knowledge_priority INTEGER DEFAULT 0;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE measurement_types
      DROP COLUMN valid_range,
      DROP COLUMN precision,
      DROP COLUMN aggregation_strategy,
      DROP COLUMN semantic_description,
      DROP COLUMN embedding_eligible,
      DROP COLUMN knowledge_priority;
    `);
  }
}
