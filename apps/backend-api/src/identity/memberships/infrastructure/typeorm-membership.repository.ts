import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMembershipRepository } from '../domain/membership.repository.interface';
import { Membership } from '../domain/membership.entity';
import { MembershipOrmEntity } from './membership.orm.entity';
import { User } from '../../users/domain/user.entity';
import { Organization } from '../../organizations/domain/organization.entity';
import { Role } from '../../authorization/domain/role.entity';

@Injectable()
export class TypeOrmMembershipRepository implements IMembershipRepository {
  constructor(
    @InjectRepository(MembershipOrmEntity)
    private readonly ormRepo: Repository<MembershipOrmEntity>,
  ) {}

  private toDomain(orm: MembershipOrmEntity): Membership {
    return new Membership({
      id: orm.id,
      user: orm.user ? new User({ id: orm.user.id, email: orm.user.email, fullName: orm.user.fullName }) : null,
      organization: orm.organization ? new Organization({ id: orm.organization.id, name: orm.organization.name, slug: orm.organization.slug }) : null,
      role: orm.role ? new Role({ id: orm.role.id, name: orm.role.name }) : null,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
      createdBy: orm.createdBy,
      updatedBy: orm.updatedBy,
    });
  }

  async save(membership: Membership): Promise<Membership> {
    const ormEntity = this.ormRepo.create({
      user: { id: membership.user.id },
      organization: { id: membership.organization.id },
      role: membership.role ? { id: membership.role.id } : null,
      createdBy: membership.createdBy,
    });
    const saved = await this.ormRepo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findByUserAndOrg(userId: string, orgId: string): Promise<Membership | null> {
    const ormEntity = await this.ormRepo.findOne({
      where: { user: { id: userId }, organization: { id: orgId } },
      relations: { user: true, organization: true, role: true },
    });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByUser(userId: string): Promise<Membership[]> {
    const list = await this.ormRepo.find({
      where: { user: { id: userId } },
      relations: { user: true, organization: true, role: true },
    });
    return list.map(orm => this.toDomain(orm));
  }

  async findByOrg(orgId: string): Promise<Membership[]> {
    const list = await this.ormRepo.find({
      where: { organization: { id: orgId } },
      relations: { user: true, organization: true, role: true },
    });
    return list.map(orm => this.toDomain(orm));
  }

  async softDelete(id: string, deletedBy: string): Promise<void> {
    await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
  }
}
