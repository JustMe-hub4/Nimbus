import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IPermissionChecker } from '../domain/permission-checker.interface';
export declare class PermissionsGuard implements CanActivate {
    private reflector;
    private permissionChecker;
    constructor(reflector: Reflector, permissionChecker: IPermissionChecker);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
