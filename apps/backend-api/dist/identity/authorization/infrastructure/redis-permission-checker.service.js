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
exports.RedisPermissionChecker = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisPermissionChecker = class RedisPermissionChecker {
    constructor(redis, membershipRepo, roleRepo) {
        this.redis = redis;
        this.membershipRepo = membershipRepo;
        this.roleRepo = roleRepo;
    }
    async hasPermission(userId, organizationId, permission) {
        const perms = await this.getUserPermissions(userId, organizationId);
        return perms.includes(permission);
    }
    async getUserPermissions(userId, organizationId) {
        const cacheKey = `perms:${userId}:${organizationId}`;
        const cached = await this.redis.get(cacheKey);
        if (cached)
            return JSON.parse(cached);
        const membership = await this.membershipRepo.findByUserAndOrg(userId, organizationId);
        if (!membership || !membership.role) {
            await this.redis.setex(cacheKey, 60, JSON.stringify([]));
            return [];
        }
        const role = await this.roleRepo.findById(membership.role.id);
        const permissions = role ? role.permissions.map(p => p.name) : [];
        await this.redis.setex(cacheKey, 300, JSON.stringify(permissions));
        return permissions;
    }
};
exports.RedisPermissionChecker = RedisPermissionChecker;
exports.RedisPermissionChecker = RedisPermissionChecker = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RedisClient')),
    __param(1, (0, common_1.Inject)('IMembershipRepository')),
    __param(2, (0, common_1.Inject)('IRoleRepository')),
    __metadata("design:paramtypes", [ioredis_1.Redis, Object, Object])
], RedisPermissionChecker);
//# sourceMappingURL=redis-permission-checker.service.js.map