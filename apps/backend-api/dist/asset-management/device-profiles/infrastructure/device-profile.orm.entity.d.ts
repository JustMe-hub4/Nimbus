import { BaseOrmEntity } from '../../../shared/infrastructure/base.orm.entity';
export declare class DeviceProfileOrmEntity extends BaseOrmEntity {
    id: string;
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
}
