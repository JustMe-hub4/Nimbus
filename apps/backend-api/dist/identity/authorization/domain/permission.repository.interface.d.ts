import { Permission } from './permission.entity';
export interface IPermissionRepository {
    save(permission: Permission): Promise<Permission>;
    findById(id: string): Promise<Permission | null>;
    findByName(name: string): Promise<Permission | null>;
    findAll(): Promise<Permission[]>;
}
