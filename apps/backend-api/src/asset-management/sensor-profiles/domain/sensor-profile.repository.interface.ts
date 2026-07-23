import { SensorProfile } from './sensor-profile.entity';

export interface ISensorProfileRepository {
  save(profile: SensorProfile): Promise<SensorProfile>;
  findById(id: string): Promise<SensorProfile | null>;
  findByName(name: string): Promise<SensorProfile | null>;
  findAll(): Promise<SensorProfile[]>;
  softDelete(id: string, deletedBy: string): Promise<void>;
}
