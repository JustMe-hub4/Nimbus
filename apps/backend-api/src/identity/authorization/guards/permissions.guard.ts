import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IPermissionChecker } from '../domain/permission-checker.interface';
import { REQUIRED_PERMISSION_KEY } from '../../shared/decorators/require-permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('IPermissionChecker') private permissionChecker: IPermissionChecker,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<string>(REQUIRED_PERMISSION_KEY, context.getHandler());
    if (!requiredPermission) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const organizationId = request.params.organizationId || request.body.organizationId;

    if (!user || !organizationId) {
      throw new ForbiddenException('Missing user or organization context');
    }

    const hasPermission = await this.permissionChecker.hasPermission(
      user.sub,
      organizationId,
      requiredPermission,
    );

    if (!hasPermission) {
      throw new ForbiddenException(`Insufficient permissions: ${requiredPermission}`);
    }
    return true;
  }
}
