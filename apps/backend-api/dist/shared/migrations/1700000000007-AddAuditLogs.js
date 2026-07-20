"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAuditLogs1700000000007 = void 0;
class AddAuditLogs1700000000007 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        aggregate_type VARCHAR(50) NOT NULL,
        aggregate_id UUID NOT NULL,
        action VARCHAR(50) NOT NULL,
        old_value JSONB,
        new_value JSONB,
        changed_by UUID NOT NULL,
        ip_address VARCHAR(45),
        user_agent TEXT,
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
        await queryRunner.query(`DROP TABLE audit_logs;`);
    }
}
exports.AddAuditLogs1700000000007 = AddAuditLogs1700000000007;
//# sourceMappingURL=1700000000007-AddAuditLogs.js.map