import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { TransferDeviceDto } from '../dto/transfer-device.dto';
import { RegisterDeviceUseCase } from '../application/register-device.use-case';
import { ListDevicesUseCase } from '../application/list-devices.use-case';
import { GetDeviceUseCase } from '../application/get-device.use-case';
import { UpdateDeviceUseCase } from '../application/update-device.use-case';
import { TransferDeviceUseCase } from '../application/transfer-device.use-case';
import { DecommissionDeviceUseCase } from '../application/decommission-device.use-case';
export declare class DeviceController {
    private registerDeviceUseCase;
    private listDevicesUseCase;
    private getDeviceUseCase;
    private updateDeviceUseCase;
    private transferDeviceUseCase;
    private decommissionDeviceUseCase;
    constructor(registerDeviceUseCase: RegisterDeviceUseCase, listDevicesUseCase: ListDevicesUseCase, getDeviceUseCase: GetDeviceUseCase, updateDeviceUseCase: UpdateDeviceUseCase, transferDeviceUseCase: TransferDeviceUseCase, decommissionDeviceUseCase: DecommissionDeviceUseCase);
    create(body: CreateDeviceDto, user: any): Promise<import("../domain/device.entity").Device>;
    list(stationId?: string, organizationId?: string): Promise<import("../domain/device.entity").Device[]>;
    getById(id: string): Promise<import("../domain/device.entity").Device>;
    update(id: string, body: UpdateDeviceDto, user: any): Promise<import("../domain/device.entity").Device>;
    transfer(id: string, body: TransferDeviceDto, user: any): Promise<import("../domain/device.entity").Device>;
    decommission(id: string, user: any): Promise<void>;
}
