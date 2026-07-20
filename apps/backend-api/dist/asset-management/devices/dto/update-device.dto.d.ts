import { DeviceStatus } from '../domain/device-status.enum';
export declare class UpdateDeviceDto {
    name?: string;
    firmwareVersion?: string;
    hardwareRevision?: string;
    heartbeatInterval?: number;
    metadata?: Record<string, any>;
    status?: DeviceStatus;
}
