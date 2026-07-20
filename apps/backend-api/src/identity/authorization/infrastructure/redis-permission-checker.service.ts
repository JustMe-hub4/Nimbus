import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { IPermissionChecker } from '../domain/permission-checker.interface';
import { IMembershipRepository } from '../../memberships/domain/membership.repository.interface';
import { IRoleRepository } from '../domain/role.repository.interface';

@Injectable()
export class RedisPermissionChecker implements IPermissionChecker {
  constructor(
    @Inject('RedisClient') private redis: Redis,
    @Inject('IMembershipRepository') private membershipRepo: IMembershipRepository,
    @Inject('IRoleRepository') private roleRepo: IRoleRepository,
  ) {}

  async hasPermission(userId: string, organizationId: string, permission: string): Promise<boolean> {
    const perms = await this.getUserPermissions(userId, organizationId);
    return perms.includes(permission);
  }

  async getUserPermissions(userId: string, organizationId: string): Promise<string[]> {
    const cacheKey = `perms:${userId}:${organizationId}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

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
}
