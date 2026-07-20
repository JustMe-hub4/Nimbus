import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrganizationRepository } from '../domain/organization.repository.interface';
import { Organization } from '../domain/organization.entity';
import { OrganizationOrmEntity } from './organization.orm.entity';

@Injectable()
export class TypeOrmOrganizationRepository implements IOrganizationRepository {
  constructor(
    @InjectRepository(OrganizationOrmEntity)
    private readonly ormRepo: Repository<OrganizationOrmEntity>,
  ) {}

  async save(org: Organization): Promise<Organization> {
    const ormEntity = this.ormRepo.create(org);
    const saved = await this.ormRepo.save(ormEntity);
    return new Organization(saved);
  }

  async findById(id: string): Promise<Organization | null> {
    const ormEntity = await this.ormRepo.findOne({ where: { id } });
    return ormEntity ? new Organization(ormEntity) : null;
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    const ormEntity = await this.ormRepo.findOne({ where: { slug } });
    return ormEntity ? new Organization(ormEntity) : null;
  }

  async softDelete(id: string, deletedBy: string): Promise<void> {
    await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
  }
}
