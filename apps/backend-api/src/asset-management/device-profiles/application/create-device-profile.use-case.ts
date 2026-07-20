import { Inject, HttpStatus } from '@nestjs/common';
import { IDeviceProfileRepository } from '../domain/device-profile.repository.interface';
import { DeviceProfile } from '../domain/device-profile.entity';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';
import { DeviceProfileCreatedEvent } from '../events/device-profile-created.event';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';

export class CreateDeviceProfileUseCase {
  constructor(
    @Inject('IDeviceProfileRepository') private profileRepo: IDeviceProfileRepository,
    @Inject('IEventDispatcher') private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(input: {
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
  }) {
    if (!input.name) {
      throw new AppException(ErrorCodes.VALIDATION_FAILED, 'Profile name is required', HttpStatus.BAD_REQUEST);
    }

    const existing = await this.profileRepo.findByName(input.name);
    if (existing) {
      throw new AppException(ErrorCodes.PROFILE_NAME_ALREADY_EXISTS, 'Profile name already exists', HttpStatus.CONFLICT);
    }

    const profile = new DeviceProfile({
      name: input.name,
      description: input.description || null,
      manufacturer: input.manufacturer || null,
      model: input.model || null,
      communicationProtocols: input.communicationProtocols || [],
      supportedSensorTypes: input.supportedSensorTypes || [],
      expectedMeasurements: input.expectedMeasurements || [],
      firmwareCompatibility: input.firmwareCompatibility || [],
      heartbeatDefaultInterval: input.heartbeatDefaultInterval || 60,
      calibrationRequired: input.calibrationRequired || false,
      calibrationInstructions: input.calibrationInstructions || null,
      metadata: input.metadata || null,
      createdBy: input.createdBy,
    });

    const saved = await this.profileRepo.save(profile);

    this.eventDispatcher.publish(
      new DeviceProfileCreatedEvent(saved.id, saved.name, saved.manufacturer, saved.model)
    );

    return saved;
  }
}
