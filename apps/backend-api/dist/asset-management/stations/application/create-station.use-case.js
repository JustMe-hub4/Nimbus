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
exports.CreateStationUseCase = void 0;
const common_1 = require("@nestjs/common");
const station_entity_1 = require("../domain/station.entity");
const app_exception_1 = require("../../../shared/exceptions/app.exception");
const error_codes_1 = require("../../../shared/exceptions/error-codes");
const station_created_event_1 = require("../events/station-created.event");
let CreateStationUseCase = class CreateStationUseCase {
    constructor(stationRepo, eventDispatcher) {
        this.stationRepo = stationRepo;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(name, organizationId, description, location, createdBy) {
        if (!name) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.VALIDATION_FAILED, 'Station name is required', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!organizationId) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.VALIDATION_FAILED, 'Organization ID is required', common_1.HttpStatus.BAD_REQUEST);
        }
        const station = new station_entity_1.Station({
            name,
            description,
            location,
            organizationId,
            createdBy,
        });
        const saved = await this.stationRepo.save(station);
        this.eventDispatcher.publish(new station_created_event_1.StationCreatedEvent(saved.id, saved.name, saved.organizationId));
        return saved;
    }
};
exports.CreateStationUseCase = CreateStationUseCase;
exports.CreateStationUseCase = CreateStationUseCase = __decorate([
    __param(0, (0, common_1.Inject)('IStationRepository')),
    __param(1, (0, common_1.Inject)('IEventDispatcher')),
    __metadata("design:paramtypes", [Object, Object])
], CreateStationUseCase);
//# sourceMappingURL=create-station.use-case.js.map