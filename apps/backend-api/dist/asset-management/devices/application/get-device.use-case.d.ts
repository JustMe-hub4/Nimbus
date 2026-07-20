import { IDeviceRepository } from '../domain/device.repository.interface';
export declare class GetDeviceUseCase {
    private deviceRepo;
    constructor(deviceRepo: IDeviceRepository);
    execute(id: string): Promise<import("../domain/device.entity").Device>;
}
