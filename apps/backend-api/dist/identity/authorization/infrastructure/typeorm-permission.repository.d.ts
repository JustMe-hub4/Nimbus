import { Repository } from 'typeorm';
import { IPermissionRepository } from '../domain/permission.repository.interface';
import { Permission } from '../domain/permission.entity';
import { PermissionOrmEntity } from './permission.orm.entity';
export declare class TypeOrmPermissionRepository implements IPermissionRepository {
    private readonly ormRepo;
    constructor(ormRepo: Repository<PermissionOrmEntity>);
    private toDomain;
    save(permission: Permission): Promise<Permission>;
    findById(id: string): Promise<Permission | null>;
    findByName(name: string): Promise<Permission | null>;
    findAll(): Promise<Permission[]>;
}
