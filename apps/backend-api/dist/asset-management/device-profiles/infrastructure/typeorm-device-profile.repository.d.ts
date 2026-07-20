import { Repository } from 'typeorm';
import { IDeviceProfileRepository } from '../domain/device-profile.repository.interface';
import { DeviceProfile } from '../domain/device-profile.entity';
import { DeviceProfileOrmEntity } from './device-profile.orm.entity';
export declare class TypeOrmDeviceProfileRepository implements IDeviceProfileRepository {
    private readonly ormRepo;
    constructor(ormRepo: Repository<DeviceProfileOrmEntity>);
    private toDomain;
    save(profile: DeviceProfile): Promise<DeviceProfile>;
    findById(id: string): Promise<DeviceProfile | null>;
    findByName(name: string): Promise<DeviceProfile | null>;
    findAll(): Promise<DeviceProfile[]>;
    softDelete(id: string, deletedBy: string): Promise<void>;
}
