import { IDeviceRepository } from '../domain/device.repository.interface';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
import { DeviceStatus } from '../domain/device-status.enum';
export declare class UpdateDeviceUseCase {
    private deviceRepo;
    private eventDispatcher;
    constructor(deviceRepo: IDeviceRepository, eventDispatcher: IEventDispatcher);
    execute(id: string, updates: {
        name?: string;
        firmwareVersion?: string;
        hardwareRevision?: string;
        heartbeatInterval?: number;
        metadata?: Record<string, any>;
        status?: DeviceStatus;
    }, updatedBy?: string): Promise<import("../domain/device.entity").Device>;
}
