import { Repository } from 'typeorm';
import { IDeviceRepository } from '../domain/device.repository.interface';
import { Device } from '../domain/device.entity';
import { DeviceOrmEntity } from './device.orm.entity';
export declare class TypeOrmDeviceRepository implements IDeviceRepository {
    private readonly ormRepo;
    constructor(ormRepo: Repository<DeviceOrmEntity>);
    private toDomain;
    save(device: Device): Promise<Device>;
    findById(id: string): Promise<Device | null>;
    findBySerialNumber(serial: string): Promise<Device | null>;
    findByStation(stationId: string): Promise<Device[]>;
    findByOrganization(organizationId: string): Promise<Device[]>;
    findAll(): Promise<Device[]>;
    softDelete(id: string, deletedBy: string): Promise<void>;
}
