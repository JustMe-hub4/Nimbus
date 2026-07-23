import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityModule } from '../identity/identity.module';
import { InMemoryEventDispatcher } from '../shared/events/in-memory-event-dispatcher';

// Units
import { UnitOrmEntity } from './units/infrastructure/unit.orm.entity';
import { TypeOrmUnitRepository } from './units/infrastructure/typeorm-unit.repository';
import { CreateUnitUseCase } from './units/application/create-unit.use-case';
import { ListUnitsUseCase } from './units/application/list-units.use-case';
import { GetUnitUseCase } from './units/application/get-unit.use-case';
import { UpdateUnitUseCase } from './units/application/update-unit.use-case';
import { UnitController } from './units/presentation/unit.controller';

// Measurement Types
import { MeasurementTypeOrmEntity } from './measurement-types/infrastructure/measurement-type.orm.entity';
import { TypeOrmMeasurementTypeRepository } from './measurement-types/infrastructure/typeorm-measurement-type.repository';
import { CreateMeasurementTypeUseCase } from './measurement-types/application/create-measurement-type.use-case';
import { ListMeasurementTypesUseCase } from './measurement-types/application/list-measurement-types.use-case';
import { GetMeasurementTypeUseCase } from './measurement-types/application/get-measurement-type.use-case';
import { UpdateMeasurementTypeUseCase } from './measurement-types/application/update-measurement-type.use-case';
import { MeasurementTypeController } from './measurement-types/presentation/measurement-type.controller';

// Sensor Profiles
import { SensorProfileOrmEntity } from './sensor-profiles/infrastructure/sensor-profile.orm.entity';
import { TypeOrmSensorProfileRepository } from './sensor-profiles/infrastructure/typeorm-sensor-profile.repository';
import { CreateSensorProfileUseCase } from './sensor-profiles/application/create-sensor-profile.use-case';
import { ListSensorProfilesUseCase } from './sensor-profiles/application/list-sensor-profiles.use-case';
import { GetSensorProfileUseCase } from './sensor-profiles/application/get-sensor-profile.use-case';
import { UpdateSensorProfileUseCase } from './sensor-profiles/application/update-sensor-profile.use-case';
import { SensorProfileController } from './sensor-profiles/presentation/sensor-profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UnitOrmEntity,
      MeasurementTypeOrmEntity,
      SensorProfileOrmEntity,
    ]),
    IdentityModule,
  ],
  controllers: [
    UnitController,
    MeasurementTypeController,
    SensorProfileController,
  ],
  providers: [
    { provide: 'IEventDispatcher', useClass: InMemoryEventDispatcher },
    { provide: 'IUnitRepository', useClass: TypeOrmUnitRepository },
    CreateUnitUseCase,
    ListUnitsUseCase,
    GetUnitUseCase,
    UpdateUnitUseCase,
    { provide: 'IMeasurementTypeRepository', useClass: TypeOrmMeasurementTypeRepository },
    CreateMeasurementTypeUseCase,
    ListMeasurementTypesUseCase,
    GetMeasurementTypeUseCase,
    UpdateMeasurementTypeUseCase,
    { provide: 'ISensorProfileRepository', useClass: TypeOrmSensorProfileRepository },
    CreateSensorProfileUseCase,
    ListSensorProfilesUseCase,
    GetSensorProfileUseCase,
    UpdateSensorProfileUseCase,
  ],
  exports: ['IUnitRepository', 'IMeasurementTypeRepository', 'ISensorProfileRepository'],
})
export class AssetManagementModule {}
