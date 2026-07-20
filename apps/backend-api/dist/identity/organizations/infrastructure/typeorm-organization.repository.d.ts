import { Repository } from 'typeorm';
import { IOrganizationRepository } from '../domain/organization.repository.interface';
import { Organization } from '../domain/organization.entity';
import { OrganizationOrmEntity } from './organization.orm.entity';
export declare class TypeOrmOrganizationRepository implements IOrganizationRepository {
    private readonly ormRepo;
    constructor(ormRepo: Repository<OrganizationOrmEntity>);
    save(org: Organization): Promise<Organization>;
    findById(id: string): Promise<Organization | null>;
    findBySlug(slug: string): Promise<Organization | null>;
    softDelete(id: string, deletedBy: string): Promise<void>;
}
