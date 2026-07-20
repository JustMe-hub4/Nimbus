import { IPermissionChecker } from '../domain/permission-checker.interface';

export class StationPolicy {
  constructor(private permissionChecker: IPermissionChecker) {}

  async canDelete(userId: string, organizationId: string): Promise<boolean> {
    return this.permissionChecker.hasPermission(userId, organizationId, 'station:delete');
  }

  async canCreate(userId: string, organizationId: string): Promise<boolean> {
    return this.permissionChecker.hasPermission(userId, organizationId, 'station:create');
  }

  async canViewTelemetry(userId: string, organizationId: string): Promise<boolean> {
    return this.permissionChecker.hasPermission(userId, organizationId, 'telemetry:view');
  }
}
