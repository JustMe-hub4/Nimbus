import { IDeviceRepository } from '../domain/device.repository.interface';
export declare class ListDevicesUseCase {
    private deviceRepo;
    constructor(deviceRepo: IDeviceRepository);
    execute(filters?: {
        organizationId?: string;
        stationId?: string;
    }): Promise<import("../domain/device.entity").Device[]>;
}
