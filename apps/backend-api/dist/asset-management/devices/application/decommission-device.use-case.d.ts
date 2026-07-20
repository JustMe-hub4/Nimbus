import { IDeviceRepository } from '../domain/device.repository.interface';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
export declare class DecommissionDeviceUseCase {
    private deviceRepo;
    private eventDispatcher;
    constructor(deviceRepo: IDeviceRepository, eventDispatcher: IEventDispatcher);
    execute(id: string, deletedBy: string): Promise<import("../domain/device.entity").Device>;
}
