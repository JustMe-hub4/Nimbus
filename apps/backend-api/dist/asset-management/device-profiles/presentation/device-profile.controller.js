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
exports.DeviceProfileController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../../shared/decorators/current-user.decorator");
const create_device_profile_use_case_1 = require("../application/create-device-profile.use-case");
const list_device_profiles_use_case_1 = require("../application/list-device-profiles.use-case");
const get_device_profile_use_case_1 = require("../application/get-device-profile.use-case");
const create_device_profile_dto_1 = require("../dto/create-device-profile.dto");
let DeviceProfileController = class DeviceProfileController {
    constructor(createUseCase, listUseCase, getUseCase) {
        this.createUseCase = createUseCase;
        this.listUseCase = listUseCase;
        this.getUseCase = getUseCase;
    }
    async create(body, user) {
        return this.createUseCase.execute({
            ...body,
            createdBy: user.sub,
        });
    }
    async list() {
        return this.listUseCase.execute();
    }
    async getById(id) {
        return this.getUseCase.execute(id);
    }
};
exports.DeviceProfileController = DeviceProfileController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_device_profile_dto_1.CreateDeviceProfileDto, Object]),
    __metadata("design:returntype", Promise)
], DeviceProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeviceProfileController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeviceProfileController.prototype, "getById", null);
exports.DeviceProfileController = DeviceProfileController = __decorate([
    (0, common_1.Controller)('device-profiles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_device_profile_use_case_1.CreateDeviceProfileUseCase,
        list_device_profiles_use_case_1.ListDeviceProfilesUseCase,
        get_device_profile_use_case_1.GetDeviceProfileUseCase])
], DeviceProfileController);
//# sourceMappingURL=device-profile.controller.js.map