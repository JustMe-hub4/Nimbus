import { BaseOrmEntity } from '../../shared/infrastructure/base.orm.entity';
import { PermissionOrmEntity } from './permission.orm.entity';
export declare class RoleOrmEntity extends BaseOrmEntity {
    id: string;
    name: string;
    description: string;
    permissions: PermissionOrmEntity[];
}
