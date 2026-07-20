"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetManagementModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const identity_module_1 = require("../identity/identity.module");
const measurement_type_orm_entity_1 = require("./measurement-types/infrastructure/measurement-type.orm.entity");
const typeorm_measurement_type_repository_1 = require("./measurement-types/infrastructure/typeorm-measurement-type.repository");
const create_measurement_type_use_case_1 = require("./measurement-types/application/create-measurement-type.use-case");
const list_measurement_types_use_case_1 = require("./measurement-types/application/list-measurement-types.use-case");
const get_measurement_type_use_case_1 = require("./measurement-types/application/get-measurement-type.use-case");
const measurement_type_controller_1 = require("./measurement-types/presentation/measurement-type.controller");
const station_orm_entity_1 = require("./stations/infrastructure/station.orm.entity");
const typeorm_station_repository_1 = require("./stations/infrastructure/typeorm-station.repository");
const create_station_use_case_1 = require("./stations/application/create-station.use-case");
const list_stations_use_case_1 = require("./stations/application/list-stations.use-case");
const get_station_use_case_1 = require("./stations/application/get-station.use-case");
const station_controller_1 = require("./stations/presentation/station.controller");
const device_orm_entity_1 = require("./devices/infrastructure/device.orm.entity");
const typeorm_device_repository_1 = require("./devices/infrastructure/typeorm-device.repository");
const register_device_use_case_1 = require("./devices/application/register-device.use-case");
const list_devices_use_case_1 = require("./devices/application/list-devices.use-case");
const get_device_use_case_1 = require("./devices/application/get-device.use-case");
const update_device_use_case_1 = require("./devices/application/update-device.use-case");
const transfer_device_use_case_1 = require("./devices/application/transfer-device.use-case");
const decommission_device_use_case_1 = require("./devices/application/decommission-device.use-case");
const device_controller_1 = require("./devices/presentation/device.controller");
const device_profile_orm_entity_1 = require("./device-profiles/infrastructure/device-profile.orm.entity");
const typeorm_device_profile_repository_1 = require("./device-profiles/infrastructure/typeorm-device-profile.repository");
const create_device_profile_use_case_1 = require("./device-profiles/application/create-device-profile.use-case");
const list_device_profiles_use_case_1 = require("./device-profiles/application/list-device-profiles.use-case");
const get_device_profile_use_case_1 = require("./device-profiles/application/get-device-profile.use-case");
const device_profile_controller_1 = require("./device-profiles/presentation/device-profile.controller");
let AssetManagementModule = class AssetManagementModule {
};
exports.AssetManagementModule = AssetManagementModule;
exports.AssetManagementModule = AssetManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                measurement_type_orm_entity_1.MeasurementTypeOrmEntity,
                station_orm_entity_1.StationOrmEntity,
                device_orm_entity_1.DeviceOrmEntity,
                device_profile_orm_entity_1.DeviceProfileOrmEntity,
            ]),
            identity_module_1.IdentityModule,
        ],
        controllers: [
            measurement_type_controller_1.MeasurementTypeController,
            station_controller_1.StationController,
            device_controller_1.DeviceController,
            device_profile_controller_1.DeviceProfileController,
        ],
        providers: [
            { provide: 'IMeasurementTypeRepository', useClass: typeorm_measurement_type_repository_1.TypeOrmMeasurementTypeRepository },
            create_measurement_type_use_case_1.CreateMeasurementTypeUseCase,
            list_measurement_types_use_case_1.ListMeasurementTypesUseCase,
            get_measurement_type_use_case_1.GetMeasurementTypeUseCase,
            { provide: 'IStationRepository', useClass: typeorm_station_repository_1.TypeOrmStationRepository },
            create_station_use_case_1.CreateStationUseCase,
            list_stations_use_case_1.ListStationsUseCase,
            get_station_use_case_1.GetStationUseCase,
            { provide: 'IDeviceRepository', useClass: typeorm_device_repository_1.TypeOrmDeviceRepository },
            register_device_use_case_1.RegisterDeviceUseCase,
            list_devices_use_case_1.ListDevicesUseCase,
            get_device_use_case_1.GetDeviceUseCase,
            update_device_use_case_1.UpdateDeviceUseCase,
            transfer_device_use_case_1.TransferDeviceUseCase,
            decommission_device_use_case_1.DecommissionDeviceUseCase,
            { provide: 'IDeviceProfileRepository', useClass: typeorm_device_profile_repository_1.TypeOrmDeviceProfileRepository },
            create_device_profile_use_case_1.CreateDeviceProfileUseCase,
            list_device_profiles_use_case_1.ListDeviceProfilesUseCase,
            get_device_profile_use_case_1.GetDeviceProfileUseCase,
        ],
        exports: [
            'IMeasurementTypeRepository',
            'IStationRepository',
            'IDeviceRepository',
            'IDeviceProfileRepository',
        ],
    })
], AssetManagementModule);
//# sourceMappingURL=asset-management.module.js.map