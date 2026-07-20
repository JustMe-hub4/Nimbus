import { BaseOrmEntity } from '../../shared/infrastructure/base.orm.entity';
export declare class UserOrmEntity extends BaseOrmEntity {
    id: string;
    email: string;
    passwordHash: string;
    fullName: string;
    isActive: boolean;
}
