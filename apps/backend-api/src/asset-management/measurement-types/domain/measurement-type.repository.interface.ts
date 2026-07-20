import { MeasurementType } from './measurement-type.entity';

export interface IMeasurementTypeRepository {
  save(type: MeasurementType): Promise<MeasurementType>;
  findById(id: string): Promise<MeasurementType | null>;
  findByName(name: string): Promise<MeasurementType | null>;
  findAll(): Promise<MeasurementType[]>;
  softDelete(id: string, deletedBy: string): Promise<void>;
}
