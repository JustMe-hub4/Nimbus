import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseOrmEntity } from '../../shared/infrastructure/base.orm.entity';
import { UserOrmEntity } from '../../users/infrastructure/user.orm.entity';
import { OrganizationOrmEntity } from '../../organizations/infrastructure/organization.orm.entity';
import { RoleOrmEntity } from '../../authorization/infrastructure/role.orm.entity';

@Entity('memberships')
export class MembershipOrmEntity extends BaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserOrmEntity;

  @ManyToOne(() => OrganizationOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationOrmEntity;

  @ManyToOne(() => RoleOrmEntity, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: RoleOrmEntity | null;
}
