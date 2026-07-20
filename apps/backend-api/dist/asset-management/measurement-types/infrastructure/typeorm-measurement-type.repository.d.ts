import { Repository } from 'typeorm';
import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';
import { MeasurementType } from '../domain/measurement-type.entity';
import { MeasurementTypeOrmEntity } from './measurement-type.orm.entity';
export declare class TypeOrmMeasurementTypeRepository implements IMeasurementTypeRepository {
    private readonly ormRepo;
    constructor(ormRepo: Repository<MeasurementTypeOrmEntity>);
    private toDomain;
    save(type: MeasurementType): Promise<MeasurementType>;
    findById(id: string): Promise<MeasurementType | null>;
    findByName(name: string): Promise<MeasurementType | null>;
    findAll(): Promise<MeasurementType[]>;
    softDelete(id: string, deletedBy: string): Promise<void>;
}
