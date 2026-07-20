import { Device } from './device.entity';

export interface IDeviceRepository {
  save(device: Device): Promise<Device>;
  findById(id: string): Promise<Device | null>;
  findBySerialNumber(serial: string): Promise<Device | null>;
  findByStation(stationId: string): Promise<Device[]>;
  findByOrganization(organizationId: string): Promise<Device[]>;
  findAll(): Promise<Device[]>;
  softDelete(id: string, deletedBy: string): Promise<void>;
}
