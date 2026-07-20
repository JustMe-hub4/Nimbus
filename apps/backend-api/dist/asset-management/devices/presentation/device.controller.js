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
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../../shared/decorators/current-user.decorator");
const create_device_dto_1 = require("../dto/create-device.dto");
const update_device_dto_1 = require("../dto/update-device.dto");
const transfer_device_dto_1 = require("../dto/transfer-device.dto");
const register_device_use_case_1 = require("../application/register-device.use-case");
const list_devices_use_case_1 = require("../application/list-devices.use-case");
const get_device_use_case_1 = require("../application/get-device.use-case");
const update_device_use_case_1 = require("../application/update-device.use-case");
const transfer_device_use_case_1 = require("../application/transfer-device.use-case");
const decommission_device_use_case_1 = require("../application/decommission-device.use-case");
let DeviceController = class DeviceController {
    constructor(registerDeviceUseCase, listDevicesUseCase, getDeviceUseCase, updateDeviceUseCase, transferDeviceUseCase, decommissionDeviceUseCase) {
        this.registerDeviceUseCase = registerDeviceUseCase;
        this.listDevicesUseCase = listDevicesUseCase;
        this.getDeviceUseCase = getDeviceUseCase;
        this.updateDeviceUseCase = updateDeviceUseCase;
        this.transferDeviceUseCase = transferDeviceUseCase;
        this.decommissionDeviceUseCase = decommissionDeviceUseCase;
    }
    async create(body, user) {
        const device = await this.registerDeviceUseCase.execute({
            organizationId: body.organizationId,
            stationId: body.stationId,
            deviceProfileId: body.deviceProfileId,
            name: body.name,
            serialNumber: body.serialNumber,
            firmwareVersion: body.firmwareVersion,
            hardwareRevision: body.hardwareRevision,
            heartbeatInterval: body.heartbeatInterval,
            metadata: body.metadata,
            createdBy: user.sub,
        });
        return device;
    }
    async list(stationId, organizationId) {
        return this.listDevicesUseCase.execute({ stationId, organizationId });
    }
    async getById(id) {
        return this.getDeviceUseCase.execute(id);
    }
    async update(id, body, user) {
        return this.updateDeviceUseCase.execute(id, body, user.sub);
    }
    async transfer(id, body, user) {
        return this.transferDeviceUseCase.execute(id, body.newStationId, body.newOrganizationId, user.sub);
    }
    async decommission(id, user) {
        await this.decommissionDeviceUseCase.execute(id, user.sub);
    }
};
exports.DeviceController = DeviceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_device_dto_1.CreateDeviceDto, Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('stationId')),
    __param(1, (0, common_1.Query)('organizationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_device_dto_1.UpdateDeviceDto, Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/transfer'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, transfer_device_dto_1.TransferDeviceDto, Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "transfer", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "decommission", null);
exports.DeviceController = DeviceController = __decorate([
    (0, common_1.Controller)('devices'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [register_device_use_case_1.RegisterDeviceUseCase,
        list_devices_use_case_1.ListDevicesUseCase,
        get_device_use_case_1.GetDeviceUseCase,
        update_device_use_case_1.UpdateDeviceUseCase,
        transfer_device_use_case_1.TransferDeviceUseCase,
        decommission_device_use_case_1.DecommissionDeviceUseCase])
], DeviceController);
//# sourceMappingURL=device.controller.js.map