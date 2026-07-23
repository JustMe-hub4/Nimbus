import { Inject, HttpStatus } from '@nestjs/common';
import { ISensorProfileRepository } from '../domain/sensor-profile.repository.interface';
import { IMeasurementTypeRepository } from '../../measurement-types/domain/measurement-type.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class UpdateSensorProfileUseCase {
  constructor(
    @Inject('ISensorProfileRepository') private profileRepo: ISensorProfileRepository,
    @Inject('IMeasurementTypeRepository') private mtRepo: IMeasurementTypeRepository,
  ) {}

  async execute(
    id: string,
    updates: {
      name?: string;
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
    },
    updatedBy?: string,
  ) {
    const profile = await this.profileRepo.findById(id);
    if (!profile) {
      throw new AppException(ErrorCodes.PROFILE_NOT_FOUND, 'Sensor profile not found', HttpStatus.NOT_FOUND);
    }

    if (updates.name && updates.name !== profile.name) {
      const existing = await this.profileRepo.findByName(updates.name);
      if (existing) {
        throw new AppException(
          ErrorCodes.PROFILE_NAME_ALREADY_EXISTS,
          'Sensor profile name already exists',
          HttpStatus.CONFLICT,
        );
      }
      profile.name = updates.name;
    }

    if (updates.supportedMeasurementTypeIds) {
      for (const mtId of updates.supportedMeasurementTypeIds) {
        const mt = await this.mtRepo.findById(mtId);
        if (!mt) {
          throw new AppException(ErrorCodes.MEASUREMENT_TYPE_NOT_FOUND, `Measurement type ${mtId} not found`, HttpStatus.NOT_FOUND);
        }
      }
      profile.supportedMeasurementTypeIds = updates.supportedMeasurementTypeIds;
    }

    if (updates.manufacturer !== undefined) profile.manufacturer = updates.manufacturer;
    if (updates.model !== undefined) profile.model = updates.model;
    if (updates.communicationProtocol !== undefined) profile.communicationProtocol = updates.communicationProtocol;
    if (updates.samplingInterval !== undefined) profile.samplingInterval = updates.samplingInterval;
    if (updates.operatingVoltage !== undefined) profile.operatingVoltage = updates.operatingVoltage;
    if (updates.calibrationRequired !== undefined) profile.calibrationRequired = updates.calibrationRequired;
    if (updates.calibrationInstructions !== undefined) profile.calibrationInstructions = updates.calibrationInstructions;
    if (updates.accuracyValue !== undefined) profile.accuracyValue = updates.accuracyValue;
    if (updates.accuracyUnit !== undefined) profile.accuracyUnit = updates.accuracyUnit;
    if (updates.accuracyCondition !== undefined) profile.accuracyCondition = updates.accuracyCondition;
    if (updates.precisionValue !== undefined) profile.precisionValue = updates.precisionValue;
    if (updates.precisionUnit !== undefined) profile.precisionUnit = updates.precisionUnit;
    if (updates.datasheetUrl !== undefined) profile.datasheetUrl = updates.datasheetUrl;
    if (updates.metadata !== undefined) profile.metadata = updates.metadata;

    profile.updatedBy = updatedBy;
    return this.profileRepo.save(profile);
  }
}
