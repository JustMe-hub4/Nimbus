"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const require_permission_decorator_1 = require("../../shared/decorators/require-permission.decorator");
let PermissionsGuard = class PermissionsGuard {
    constructor(reflector, permissionChecker) {
        this.reflector = reflector;
        this.permissionChecker = permissionChecker;
    }
    async canActivate(context) {
        const requiredPermission = this.reflector.get(require_permission_decorator_1.REQUIRED_PERMISSION_KEY, context.getHandler());
        if (!requiredPermission)
            return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const organizationId = request.params.organizationId || request.body.organizationId;
        if (!user || !organizationId) {
            throw new common_1.ForbiddenException('Missing user or organization context');
        }
        const hasPermission = await this.permissionChecker.hasPermission(user.sub, organizationId, requiredPermission);
        if (!hasPermission) {
            throw new common_1.ForbiddenException(`Insufficient permissions: ${requiredPermission}`);
        }
        return true;
    }
};
exports.PermissionsGuard = PermissionsGuard;
exports.PermissionsGuard = PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('IPermissionChecker')),
    __metadata("design:paramtypes", [core_1.Reflector, Object])
], PermissionsGuard);
//# sourceMappingURL=permissions.guard.js.map