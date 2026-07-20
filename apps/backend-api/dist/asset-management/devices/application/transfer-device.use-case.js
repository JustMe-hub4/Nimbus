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
exports.TransferDeviceUseCase = void 0;
const common_1 = require("@nestjs/common");
const app_exception_1 = require("../../../shared/exceptions/app.exception");
const error_codes_1 = require("../../../shared/exceptions/error-codes");
const device_transferred_event_1 = require("../events/device-transferred.event");
let TransferDeviceUseCase = class TransferDeviceUseCase {
    constructor(deviceRepo, stationRepo, eventDispatcher) {
        this.deviceRepo = deviceRepo;
        this.stationRepo = stationRepo;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(deviceId, newStationId, newOrganizationId, updatedBy) {
        const device = await this.deviceRepo.findById(deviceId);
        if (!device) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.DEVICE_NOT_FOUND, 'Device not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (device.deletedAt) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.DEVICE_ALREADY_DECOMMISSIONED, 'Cannot transfer a decommissioned device', common_1.HttpStatus.BAD_REQUEST);
        }
        const station = await this.stationRepo.findById(newStationId);
        if (!station) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.STATION_NOT_FOUND, 'New station not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (station.organizationId !== newOrganizationId) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.VALIDATION_FAILED, 'Station does not belong to the specified organization', common_1.HttpStatus.BAD_REQUEST);
        }
        const oldStationId = device.stationId;
        const oldOrganizationId = device.organizationId;
        device.transfer(newStationId, newOrganizationId);
        device.updatedBy = updatedBy;
        const saved = await this.deviceRepo.save(device);
        this.eventDispatcher.publish(new device_transferred_event_1.DeviceTransferredEvent(saved.id, oldStationId, newStationId, oldOrganizationId, newOrganizationId));
        return saved;
    }
};
exports.TransferDeviceUseCase = TransferDeviceUseCase;
exports.TransferDeviceUseCase = TransferDeviceUseCase = __decorate([
    __param(0, (0, common_1.Inject)('IDeviceRepository')),
    __param(1, (0, common_1.Inject)('IStationRepository')),
    __param(2, (0, common_1.Inject)('IEventDispatcher')),
    __metadata("design:paramtypes", [Object, Object, Object])
], TransferDeviceUseCase);
//# sourceMappingURL=transfer-device.use-case.js.map