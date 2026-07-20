import { BaseOrmEntity } from '../../shared/infrastructure/base.orm.entity';
import { UserOrmEntity } from '../../users/infrastructure/user.orm.entity';
import { OrganizationOrmEntity } from '../../organizations/infrastructure/organization.orm.entity';
import { RoleOrmEntity } from '../../authorization/infrastructure/role.orm.entity';
export declare class MembershipOrmEntity extends BaseOrmEntity {
    id: string;
    user: UserOrmEntity;
    organization: OrganizationOrmEntity;
    role: RoleOrmEntity | null;
}
