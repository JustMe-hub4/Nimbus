import { Redis } from 'ioredis';
import { IPermissionChecker } from '../domain/permission-checker.interface';
import { IMembershipRepository } from '../../memberships/domain/membership.repository.interface';
import { IRoleRepository } from '../domain/role.repository.interface';
export declare class RedisPermissionChecker implements IPermissionChecker {
    private redis;
    private membershipRepo;
    private roleRepo;
    constructor(redis: Redis, membershipRepo: IMembershipRepository, roleRepo: IRoleRepository);
    hasPermission(userId: string, organizationId: string, permission: string): Promise<boolean>;
    getUserPermissions(userId: string, organizationId: string): Promise<string[]>;
}
