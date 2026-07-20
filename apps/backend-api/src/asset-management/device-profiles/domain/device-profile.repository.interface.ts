import { DeviceProfile } from './device-profile.entity';

export interface IDeviceProfileRepository {
  save(profile: DeviceProfile): Promise<DeviceProfile>;
  findById(id: string): Promise<DeviceProfile | null>;
  findByName(name: string): Promise<DeviceProfile | null>;
  findAll(): Promise<DeviceProfile[]>;
  softDelete(id: string, deletedBy: string): Promise<void>;
}
