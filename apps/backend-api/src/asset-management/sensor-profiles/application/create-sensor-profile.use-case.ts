import { Inject, HttpStatus } from '@nestjs/common';
import { ISensorProfileRepository } from '../domain/sensor-profile.repository.interface';
import { SensorProfile } from '../domain/sensor-profile.entity';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';
import { SensorProfileCreatedEvent } from '../events/sensor-profile-created.event';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
import { IMeasurementTypeRepository } from '../../measurement-types/domain/measurement-type.repository.interface';

export class CreateSensorProfileUseCase {
  constructor(
    @Inject('ISensorProfileRepository') private profileRepo: ISensorProfileRepository,
    @Inject('IMeasurementTypeRepository') private mtRepo: IMeasurementTypeRepository,
    @Inject('IEventDispatcher') private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(input: {
    name: string;
    manufacturer?: string;
    model?: string;
    communicationProtocol?: string;
    supportedMeasurementTypeIds?: string[];
    samplingInterval?: number;
    operatingVoltage?: string;
    calibrationRequired?: boolean;
    calibrationInstructions?: string;
    accuracyValue?: number;
    accuracyUnit?: string;
    accuracyCondition?: string;
    precisionValue?: number;
    precisionUnit?: string;
    datasheetUrl?: string;
    metadata?: Record<string, any>;
    createdBy?: string;
  }) {
    const existing = await this.profileRepo.findByName(input.name);
    if (existing) {
      throw new AppException(ErrorCodes.PROFILE_NAME_ALREADY_EXISTS, 'Sensor profile name already exists', HttpStatus.CONFLICT);
    }

    // Validate measurement types exist
    if (input.supportedMeasurementTypeIds && input.supportedMeasurementTypeIds.length > 0) {
      for (const mtId of input.supportedMeasurementTypeIds) {
        const mt = await this.mtRepo.findById(mtId);
        if (!mt) {
          throw new AppException(ErrorCodes.MEASUREMENT_TYPE_NOT_FOUND, `Measurement type ${mtId} not found`, HttpStatus.NOT_FOUND);
        }
      }
    }

    const profile = new SensorProfile({
      name: input.name,
      manufacturer: input.manufacturer || null,
      model: input.model || null,
      communicationProtocol: input.communicationProtocol || null,
      supportedMeasurementTypeIds: input.supportedMeasurementTypeIds || [],
      samplingInterval: input.samplingInterval || null,
      operatingVoltage: input.operatingVoltage || null,
      calibrationRequired: input.calibrationRequired ?? false,
      calibrationInstructions: input.calibrationInstructions || null,
      accuracyValue: input.accuracyValue ?? null,
      accuracyUnit: input.accuracyUnit || null,
      accuracyCondition: input.accuracyCondition || null,
      precisionValue: input.precisionValue ?? null,
      precisionUnit: input.precisionUnit || null,
      datasheetUrl: input.datasheetUrl || null,
      metadata: input.metadata || null,
      createdBy: input.createdBy,
    });

    const saved = await this.profileRepo.save(profile);

    this.eventDispatcher.publish(
      new SensorProfileCreatedEvent(saved.id, saved.name, saved.manufacturer, saved.model)
    );

    return saved;
  }
}
