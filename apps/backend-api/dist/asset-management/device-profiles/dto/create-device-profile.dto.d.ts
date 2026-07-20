export declare class CreateDeviceProfileDto {
    name: string;
    description?: string;
    manufacturer?: string;
    model?: string;
    communicationProtocols?: string[];
    supportedSensorTypes?: string[];
    expectedMeasurements?: string[];
    firmwareCompatibility?: string[];
    heartbeatDefaultInterval?: number;
    calibrationRequired?: boolean;
    calibrationInstructions?: string;
    metadata?: Record<string, any>;
}
