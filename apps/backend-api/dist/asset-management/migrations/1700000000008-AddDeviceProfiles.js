"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDeviceProfiles1700000000008 = void 0;
class AddDeviceProfiles1700000000008 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE device_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        manufacturer VARCHAR(255),
        model VARCHAR(255),
        communication_protocols JSONB DEFAULT '[]',
        supported_sensor_types JSONB DEFAULT '[]',
        expected_measurements JSONB DEFAULT '[]',
        firmware_compatibility JSONB DEFAULT '[]',
        heartbeat_default_interval INTEGER DEFAULT 60,
        calibration_required BOOLEAN DEFAULT false,
        calibration_instructions TEXT,
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
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE device_profiles;`);
    }
}
exports.AddDeviceProfiles1700000000008 = AddDeviceProfiles1700000000008;
//# sourceMappingURL=1700000000008-AddDeviceProfiles.js.map