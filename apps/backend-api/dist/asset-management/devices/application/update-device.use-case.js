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
exports.UpdateDeviceUseCase = void 0;
const common_1 = require("@nestjs/common");
const app_exception_1 = require("../../../shared/exceptions/app.exception");
const error_codes_1 = require("../../../shared/exceptions/error-codes");
const device_validator_1 = require("../domain/validators/device.validator");
const device_renamed_event_1 = require("../events/device-renamed.event");
const device_firmware_updated_event_1 = require("../events/device-firmware-updated.event");
let UpdateDeviceUseCase = class UpdateDeviceUseCase {
    constructor(deviceRepo, eventDispatcher) {
        this.deviceRepo = deviceRepo;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(id, updates, updatedBy) {
        const device = await this.deviceRepo.findById(id);
        if (!device) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.DEVICE_NOT_FOUND, 'Device not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (device.deletedAt) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.DEVICE_ALREADY_DECOMMISSIONED, 'Cannot update a decommissioned device', common_1.HttpStatus.BAD_REQUEST);
        }
        let nameChanged = false;
        let firmwareChanged = false;
        if (updates.name && updates.name !== device.name) {
            device_validator_1.DeviceValidator.validateName(updates.name);
            const oldName = device.name;
            device.updateName(updates.name);
            nameChanged = true;
        }
        if (updates.firmwareVersion !== undefined && updates.firmwareVersion !== device.firmwareVersion) {
            const oldFirmware = device.firmwareVersion;
            device.updateFirmware(updates.firmwareVersion);
            firmwareChanged = true;
        }
        if (updates.hardwareRevision !== undefined) {
            device.updateHardware(updates.hardwareRevision);
        }
        if (updates.heartbeatInterval !== undefined) {
            device.updateHeartbeatInterval(updates.heartbeatInterval);
        }
        if (updates.metadata !== undefined) {
            device.updateMetadata(updates.metadata);
        }
        if (updates.status !== undefined) {
            device.updateStatus(updates.status);
        }
        device.updatedBy = updatedBy;
        const saved = await this.deviceRepo.save(device);
        if (nameChanged) {
            this.eventDispatcher.publish(new device_renamed_event_1.DeviceRenamedEvent(saved.id, updates.name, saved.name));
        }
        if (firmwareChanged) {
            this.eventDispatcher.publish(new device_firmware_updated_event_1.DeviceFirmwareUpdatedEvent(saved.id, null, updates.firmwareVersion));
        }
        return saved;
    }
};
exports.UpdateDeviceUseCase = UpdateDeviceUseCase;
exports.UpdateDeviceUseCase = UpdateDeviceUseCase = __decorate([
    __param(0, (0, common_1.Inject)('IDeviceRepository')),
    __param(1, (0, common_1.Inject)('IEventDispatcher')),
    __metadata("design:paramtypes", [Object, Object])
], UpdateDeviceUseCase);
//# sourceMappingURL=update-device.use-case.js.map