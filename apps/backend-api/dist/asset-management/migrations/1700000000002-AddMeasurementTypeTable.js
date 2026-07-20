"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMeasurementTypeTable1700000000002 = void 0;
class AddMeasurementTypeTable1700000000002 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE measurement_types (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) UNIQUE NOT NULL,
        unit VARCHAR(50) NOT NULL,
        min_value FLOAT,
        max_value FLOAT,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        deleted_at TIMESTAMPTZ,
        created_by UUID,
        updated_by UUID,
        deleted_by UUID
      );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE measurement_types;`);
    }
}
exports.AddMeasurementTypeTable1700000000002 = AddMeasurementTypeTable1700000000002;
//# sourceMappingURL=1700000000002-AddMeasurementTypeTable.js.map