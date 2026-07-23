import { MeasurementType } from './measurement-type.entity';

export interface IMeasurementTypeRepository {
  save(type: MeasurementType): Promise<MeasurementType>;
  findById(id: string): Promise<MeasurementType | null>;
  findByName(name: string): Promise<MeasurementType | null>;
  findByCode(code: string): Promise<MeasurementType | null>;
  findAll(category?: string): Promise<MeasurementType[]>;
  softDelete(id: string, deletedBy: string): Promise<void>;
}
