import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUnitsTable1700000000009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE units (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        symbol VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        si_equivalent VARCHAR(50),
        conversion_metadata JSONB,
        precision_defaults JSONB,
        status VARCHAR(20) DEFAULT 'ACTIVE',
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
    await queryRunner.query(`DROP TABLE units;`);
  }
}
