import { Repository } from 'typeorm';
import { IStationRepository } from '../domain/station.repository.interface';
import { Station } from '../domain/station.entity';
import { StationOrmEntity } from './station.orm.entity';
export declare class TypeOrmStationRepository implements IStationRepository {
    private readonly ormRepo;
    constructor(ormRepo: Repository<StationOrmEntity>);
    private toDomain;
    save(station: Station): Promise<Station>;
    findById(id: string): Promise<Station | null>;
    findByOrganization(organizationId: string): Promise<Station[]>;
    findAll(): Promise<Station[]>;
    softDelete(id: string, deletedBy: string): Promise<void>;
}
