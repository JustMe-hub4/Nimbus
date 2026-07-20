import { IPermissionChecker } from '../domain/permission-checker.interface';
export declare class StationPolicy {
    private permissionChecker;
    constructor(permissionChecker: IPermissionChecker);
    canDelete(userId: string, organizationId: string): Promise<boolean>;
    canCreate(userId: string, organizationId: string): Promise<boolean>;
    canViewTelemetry(userId: string, organizationId: string): Promise<boolean>;
}
