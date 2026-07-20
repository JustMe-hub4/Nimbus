"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStationsTable1700000000004 = void 0;
class AddStationsTable1700000000004 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE stations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        location TEXT,
        organization_id UUID NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        deleted_at TIMESTAMPTZ,
        created_by UUID,
        updated_by UUID,
        deleted_by UUID,
        CONSTRAINT fk_station_organization FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
      );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE stations;`);
    }
}
exports.AddStationsTable1700000000004 = AddStationsTable1700000000004;
//# sourceMappingURL=1700000000004-AddStationsTable.js.map