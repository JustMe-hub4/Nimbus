import { CreateDeviceProfileUseCase } from '../application/create-device-profile.use-case';
import { ListDeviceProfilesUseCase } from '../application/list-device-profiles.use-case';
import { GetDeviceProfileUseCase } from '../application/get-device-profile.use-case';
import { CreateDeviceProfileDto } from '../dto/create-device-profile.dto';
export declare class DeviceProfileController {
    private createUseCase;
    private listUseCase;
    private getUseCase;
    constructor(createUseCase: CreateDeviceProfileUseCase, listUseCase: ListDeviceProfilesUseCase, getUseCase: GetDeviceProfileUseCase);
    create(body: CreateDeviceProfileDto, user: any): Promise<import("../domain/device-profile.entity").DeviceProfile>;
    list(): Promise<import("../domain/device-profile.entity").DeviceProfile[]>;
    getById(id: string): Promise<import("../domain/device-profile.entity").DeviceProfile>;
}
