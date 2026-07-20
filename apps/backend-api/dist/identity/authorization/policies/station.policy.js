"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationPolicy = void 0;
class StationPolicy {
    constructor(permissionChecker) {
        this.permissionChecker = permissionChecker;
    }
    async canDelete(userId, organizationId) {
        return this.permissionChecker.hasPermission(userId, organizationId, 'station:delete');
    }
    async canCreate(userId, organizationId) {
        return this.permissionChecker.hasPermission(userId, organizationId, 'station:create');
    }
    async canViewTelemetry(userId, organizationId) {
        return this.permissionChecker.hasPermission(userId, organizationId, 'telemetry:view');
    }
}
exports.StationPolicy = StationPolicy;
//# sourceMappingURL=station.policy.js.map