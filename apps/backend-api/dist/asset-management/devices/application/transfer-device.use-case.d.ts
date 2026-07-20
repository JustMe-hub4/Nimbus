import { IDeviceRepository } from '../domain/device.repository.interface';
import { IStationRepository } from '../../stations/domain/station.repository.interface';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
export declare class TransferDeviceUseCase {
    private deviceRepo;
    private stationRepo;
    private eventDispatcher;
    constructor(deviceRepo: IDeviceRepository, stationRepo: IStationRepository, eventDispatcher: IEventDispatcher);
    execute(deviceId: string, newStationId: string, newOrganizationId: string, updatedBy?: string): Promise<import("../domain/device.entity").Device>;
}
