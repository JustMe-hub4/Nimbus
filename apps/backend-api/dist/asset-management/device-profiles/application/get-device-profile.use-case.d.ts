import { IDeviceProfileRepository } from '../domain/device-profile.repository.interface';
export declare class GetDeviceProfileUseCase {
    private profileRepo;
    constructor(profileRepo: IDeviceProfileRepository);
    execute(id: string): Promise<import("../domain/device-profile.entity").DeviceProfile>;
}
