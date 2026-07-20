import { Repository } from 'typeorm';
import { IRoleRepository } from '../domain/role.repository.interface';
import { Role } from '../domain/role.entity';
import { RoleOrmEntity } from './role.orm.entity';
export declare class TypeOrmRoleRepository implements IRoleRepository {
    private readonly ormRepo;
    constructor(ormRepo: Repository<RoleOrmEntity>);
    private toDomain;
    save(role: Role): Promise<Role>;
    findById(id: string): Promise<Role | null>;
    findByName(name: string): Promise<Role | null>;
    findAll(): Promise<Role[]>;
}
