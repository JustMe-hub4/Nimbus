"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhanceDevices1700000000006 = void 0;
class EnhanceDevices1700000000006 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE devices
      ADD COLUMN health FLOAT DEFAULT 100.0,
      ADD COLUMN first_seen TIMESTAMPTZ,
      ADD COLUMN last_seen TIMESTAMPTZ,
      ADD COLUMN last_telemetry TIMESTAMPTZ,
      ADD COLUMN connection_count INTEGER DEFAULT 0,
      ADD COLUMN restart_count INTEGER DEFAULT 0,
      ADD COLUMN semantic_type VARCHAR(50),
      ADD COLUMN embedding_eligible BOOLEAN DEFAULT false,
      ADD COLUMN knowledge_priority INTEGER DEFAULT 0,
      ADD COLUMN agent_readable BOOLEAN DEFAULT true;
    `);
        await queryRunner.query(`
      ALTER TABLE devices DROP CONSTRAINT fk_device_organization;
      ALTER TABLE devices DROP CONSTRAINT fk_device_station;
    `);
        await queryRunner.query(`
      ALTER TABLE devices
      ADD CONSTRAINT fk_device_organization FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT,
      ADD CONSTRAINT fk_device_station FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE RESTRICT;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE devices
      DROP COLUMN health,
      DROP COLUMN first_seen,
      DROP COLUMN last_seen,
      DROP COLUMN last_telemetry,
      DROP COLUMN connection_count,
      DROP COLUMN restart_count,
      DROP COLUMN semantic_type,
      DROP COLUMN embedding_eligible,
      DROP COLUMN knowledge_priority,
      DROP COLUMN agent_readable;
    `);
        await queryRunner.query(`
      ALTER TABLE devices DROP CONSTRAINT fk_device_organization;
      ALTER TABLE devices DROP CONSTRAINT fk_device_station;
    `);
        await queryRunner.query(`
      ALTER TABLE devices
      ADD CONSTRAINT fk_device_organization FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
      ADD CONSTRAINT fk_device_station FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE;
    `);
    }
}
exports.EnhanceDevices1700000000006 = EnhanceDevices1700000000006;
//# sourceMappingURL=1700000000006-EnhanceDevices.js.map