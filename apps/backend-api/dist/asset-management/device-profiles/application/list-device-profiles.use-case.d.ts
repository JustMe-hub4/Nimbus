import { IDeviceProfileRepository } from '../domain/device-profile.repository.interface';
export declare class ListDeviceProfilesUseCase {
    private profileRepo;
    constructor(profileRepo: IDeviceProfileRepository);
    execute(): Promise<import("../domain/device-profile.entity").DeviceProfile[]>;
}
