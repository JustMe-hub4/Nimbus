import { Station } from './station.entity';

export interface IStationRepository {
  save(station: Station): Promise<Station>;
  findById(id: string): Promise<Station | null>;
  findByOrganization(organizationId: string): Promise<Station[]>;
  findAll(): Promise<Station[]>;
  softDelete(id: string, deletedBy: string): Promise<void>;
}
