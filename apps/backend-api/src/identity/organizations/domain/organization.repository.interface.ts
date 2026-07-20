import { Organization } from './organization.entity';

export interface IOrganizationRepository {
  save(org: Organization): Promise<Organization>;
  findById(id: string): Promise<Organization | null>;
  findBySlug(slug: string): Promise<Organization | null>;
  softDelete(id: string, deletedBy: string): Promise<void>;
}
