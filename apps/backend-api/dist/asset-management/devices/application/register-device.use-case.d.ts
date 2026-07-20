import { IDeviceRepository } from '../domain/device.repository.interface';
import { IStationRepository } from '../../stations/domain/station.repository.interface';
import { Device } from '../domain/device.entity';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
export declare class RegisterDeviceUseCase {
    private deviceRepo;
    private stationRepo;
    private eventDispatcher;
    constructor(deviceRepo: IDeviceRepository, stationRepo: IStationRepository, eventDispatcher: IEventDispatcher);
    execute(input: {
        organizationId: string;
        stationId: string;
        deviceProfileId?: string;
        name: string;
        serialNumber: string;
        firmwareVersion?: string;
        hardwareRevision?: string;
        heartbeatInterval?: number;
        metadata?: Record<string, any>;
        createdBy?: string;
    }): Promise<Device>;
}
