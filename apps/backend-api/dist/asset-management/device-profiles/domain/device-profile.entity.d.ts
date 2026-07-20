export declare class DeviceProfile {
    readonly id: string;
    name: string;
    description: string | null;
    manufacturer: string | null;
    model: string | null;
    communicationProtocols: string[];
    supportedSensorTypes: string[];
    expectedMeasurements: string[];
    firmwareCompatibility: string[];
    heartbeatDefaultInterval: number;
    calibrationRequired: boolean;
    calibrationInstructions: string | null;
    metadata: Record<string, any> | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    createdBy: string | null;
    updatedBy: string | null;
    constructor(props: Partial<DeviceProfile>);
}
