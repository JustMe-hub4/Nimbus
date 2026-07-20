import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityModule } from '../identity/identity.module';

// Measurement Types
import { MeasurementTypeOrmEntity } from './measurement-types/infrastructure/measurement-type.orm.entity';
import { TypeOrmMeasurementTypeRepository } from './measurement-types/infrastructure/typeorm-measurement-type.repository';
import { CreateMeasurementTypeUseCase } from './measurement-types/application/create-measurement-type.use-case';
import { ListMeasurementTypesUseCase } from './measurement-types/application/list-measurement-types.use-case';
import { GetMeasurementTypeUseCase } from './measurement-types/application/get-measurement-type.use-case';
import { MeasurementTypeController } from './measurement-types/presentation/measurement-type.controller';

// Stations
import { StationOrmEntity } from './stations/infrastructure/station.orm.entity';
import { TypeOrmStationRepository } from './stations/infrastructure/typeorm-station.repository';
import { CreateStationUseCase } from './stations/application/create-station.use-case';
import { ListStationsUseCase } from './stations/application/list-stations.use-case';
import { GetStationUseCase } from './stations/application/get-station.use-case';
import { StationController } from './stations/presentation/station.controller';

// Devices
import { DeviceOrmEntity } from './devices/infrastructure/device.orm.entity';
import { TypeOrmDeviceRepository } from './devices/infrastructure/typeorm-device.repository';
import { RegisterDeviceUseCase } from './devices/application/register-device.use-case';
import { ListDevicesUseCase } from './devices/application/list-devices.use-case';
import { GetDeviceUseCase } from './devices/application/get-device.use-case';
import { UpdateDeviceUseCase } from './devices/application/update-device.use-case';
import { TransferDeviceUseCase } from './devices/application/transfer-device.use-case';
import { DecommissionDeviceUseCase } from './devices/application/decommission-device.use-case';
import { DeviceController } from './devices/presentation/device.controller';

// Device Profiles
import { DeviceProfileOrmEntity } from './device-profiles/infrastructure/device-profile.orm.entity';
import { TypeOrmDeviceProfileRepository } from './device-profiles/infrastructure/typeorm-device-profile.repository';
import { CreateDeviceProfileUseCase } from './device-profiles/application/create-device-profile.use-case';
import { ListDeviceProfilesUseCase } from './device-profiles/application/list-device-profiles.use-case';
import { GetDeviceProfileUseCase } from './device-profiles/application/get-device-profile.use-case';
import { DeviceProfileController } from './device-profiles/presentation/device-profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MeasurementTypeOrmEntity,
      StationOrmEntity,
      DeviceOrmEntity,
      DeviceProfileOrmEntity,
    ]),
    IdentityModule,
  ],
  controllers: [
    MeasurementTypeController,
    StationController,
    DeviceController,
    DeviceProfileController,
  ],
  providers: [
    // Measurement Type
    { provide: 'IMeasurementTypeRepository', useClass: TypeOrmMeasurementTypeRepository },
    CreateMeasurementTypeUseCase,
    ListMeasurementTypesUseCase,
    GetMeasurementTypeUseCase,

    // Station
    { provide: 'IStationRepository', useClass: TypeOrmStationRepository },
    CreateStationUseCase,
    ListStationsUseCase,
    GetStationUseCase,

    // Device
    { provide: 'IDeviceRepository', useClass: TypeOrmDeviceRepository },
    RegisterDeviceUseCase,
    ListDevicesUseCase,
    GetDeviceUseCase,
    UpdateDeviceUseCase,
    TransferDeviceUseCase,
    DecommissionDeviceUseCase,

    // Device Profile
    { provide: 'IDeviceProfileRepository', useClass: TypeOrmDeviceProfileRepository },
    CreateDeviceProfileUseCase,
    ListDeviceProfilesUseCase,
    GetDeviceProfileUseCase,
  ],
  exports: [
    'IMeasurementTypeRepository',
    'IStationRepository',
    'IDeviceRepository',
    'IDeviceProfileRepository',
  ],
})
export class AssetManagementModule {}
