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
exports.CreateDeviceProfileUseCase = void 0;
const common_1 = require("@nestjs/common");
const device_profile_entity_1 = require("../domain/device-profile.entity");
const app_exception_1 = require("../../../shared/exceptions/app.exception");
const error_codes_1 = require("../../../shared/exceptions/error-codes");
const device_profile_created_event_1 = require("../events/device-profile-created.event");
let CreateDeviceProfileUseCase = class CreateDeviceProfileUseCase {
    constructor(profileRepo, eventDispatcher) {
        this.profileRepo = profileRepo;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(input) {
        if (!input.name) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.VALIDATION_FAILED, 'Profile name is required', common_1.HttpStatus.BAD_REQUEST);
        }
        const existing = await this.profileRepo.findByName(input.name);
        if (existing) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.PROFILE_NAME_ALREADY_EXISTS, 'Profile name already exists', common_1.HttpStatus.CONFLICT);
        }
        const profile = new device_profile_entity_1.DeviceProfile({
            name: input.name,
            description: input.description || null,
            manufacturer: input.manufacturer || null,
            model: input.model || null,
            communicationProtocols: input.communicationProtocols || [],
            supportedSensorTypes: input.supportedSensorTypes || [],
            expectedMeasurements: input.expectedMeasurements || [],
            firmwareCompatibility: input.firmwareCompatibility || [],
            heartbeatDefaultInterval: input.heartbeatDefaultInterval || 60,
            calibrationRequired: input.calibrationRequired || false,
            calibrationInstructions: input.calibrationInstructions || null,
            metadata: input.metadata || null,
            createdBy: input.createdBy,
        });
        const saved = await this.profileRepo.save(profile);
        this.eventDispatcher.publish(new device_profile_created_event_1.DeviceProfileCreatedEvent(saved.id, saved.name, saved.manufacturer, saved.model));
        return saved;
    }
};
exports.CreateDeviceProfileUseCase = CreateDeviceProfileUseCase;
exports.CreateDeviceProfileUseCase = CreateDeviceProfileUseCase = __decorate([
    __param(0, (0, common_1.Inject)('IDeviceProfileRepository')),
    __param(1, (0, common_1.Inject)('IEventDispatcher')),
    __metadata("design:paramtypes", [Object, Object])
], CreateDeviceProfileUseCase);
//# sourceMappingURL=create-device-profile.use-case.js.map