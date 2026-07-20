export interface IPermissionChecker {
  hasPermission(userId: string, organizationId: string, permission: string): Promise<boolean>;
  getUserPermissions(userId: string, organizationId: string): Promise<string[]>;
}
