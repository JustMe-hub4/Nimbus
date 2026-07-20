export declare class CreateDeviceDto {
    organizationId: string;
    stationId: string;
    deviceProfileId?: string;
    name: string;
    serialNumber: string;
    firmwareVersion?: string;
    hardwareRevision?: string;
    heartbeatInterval?: number;
    metadata?: Record<string, any>;
}
