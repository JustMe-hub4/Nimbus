import { IDeviceProfileRepository } from '../domain/device-profile.repository.interface';
import { DeviceProfile } from '../domain/device-profile.entity';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
export declare class CreateDeviceProfileUseCase {
    private profileRepo;
    private eventDispatcher;
    constructor(profileRepo: IDeviceProfileRepository, eventDispatcher: IEventDispatcher);
    execute(input: {
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
        createdBy?: string;
    }): Promise<DeviceProfile>;
}
