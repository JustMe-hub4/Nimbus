"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDeviceUseCase = void 0;
const common_1 = require("@nestjs/common");
const device_entity_1 = require("../domain/device.entity");
const device_validator_1 = require("../domain/validators/device.validator");
const app_exception_1 = require("../../../shared/exceptions/app.exception");
const error_codes_1 = require("../../../shared/exceptions/error-codes");
const device_registered_event_1 = require("../events/device-registered.event");
let RegisterDeviceUseCase = class RegisterDeviceUseCase {
    constructor(deviceRepo, stationRepo, eventDispatcher) {
        this.deviceRepo = deviceRepo;
        this.stationRepo = stationRepo;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(input) {
        device_validator_1.DeviceValidator.validateName(input.name);
        device_validator_1.DeviceValidator.validateSerialNumber(input.serialNumber);
        const station = await this.stationRepo.findById(input.stationId);
        if (!station) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.STATION_NOT_FOUND, 'Station not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (station.organizationId !== input.organizationId) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.VALIDATION_FAILED, 'Station does not belong to the specified organization', common_1.HttpStatus.BAD_REQUEST);
        }
        const existing = await this.deviceRepo.findBySerialNumber(input.serialNumber);
        if (existing) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.DEVICE_SERIAL_ALREADY_EXISTS, 'Device with this serial number already exists', common_1.HttpStatus.CONFLICT);
        }
        const device = new device_entity_1.Device({
            organizationId: input.organizationId,
            stationId: input.stationId,
            deviceProfileId: input.deviceProfileId || null,
            name: input.name,
            serialNumber: input.serialNumber,
            firmwareVersion: input.firmwareVersion || null,
            hardwareRevision: input.hardwareRevision || null,
            heartbeatInterval: input.heartbeatInterval || null,
            metadata: input.metadata || null,
            createdBy: input.createdBy,
        });
        const saved = await this.deviceRepo.save(device);
        this.eventDispatcher.publish(new device_registered_event_1.DeviceRegisteredEvent(saved.id, saved.serialNumber, saved.name, saved.organizationId, saved.stationId));
        return saved;
    }
};
exports.RegisterDeviceUseCase = RegisterDeviceUseCase;
exports.RegisterDeviceUseCase = RegisterDeviceUseCase = __decorate([
    __param(0, (0, common_1.Inject)('IDeviceRepository')),
    __param(1, (0, common_1.Inject)('IStationRepository')),
    __param(2, (0, common_1.Inject)('IEventDispatcher')),
    __metadata("design:paramtypes", [Object, Object, Object])
], RegisterDeviceUseCase);
//# sourceMappingURL=register-device.use-case.js.map