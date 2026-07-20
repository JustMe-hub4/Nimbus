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
exports.CreateMeasurementTypeUseCase = void 0;
const common_1 = require("@nestjs/common");
const measurement_type_entity_1 = require("../domain/measurement-type.entity");
const app_exception_1 = require("../../../shared/exceptions/app.exception");
const error_codes_1 = require("../../../shared/exceptions/error-codes");
const measurement_type_created_event_1 = require("../events/measurement-type-created.event");
let CreateMeasurementTypeUseCase = class CreateMeasurementTypeUseCase {
    constructor(repo, eventDispatcher) {
        this.repo = repo;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(name, unit, minValue, maxValue, description, createdBy) {
        const existing = await this.repo.findByName(name);
        if (existing) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.MEASUREMENT_TYPE_ALREADY_EXISTS, `Measurement type "${name}" already exists`, common_1.HttpStatus.CONFLICT);
        }
        if (minValue !== null && maxValue !== null && minValue > maxValue) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.VALIDATION_FAILED, 'Minimum value must be less than or equal to maximum value', common_1.HttpStatus.BAD_REQUEST);
        }
        const measurementType = new measurement_type_entity_1.MeasurementType({
            name,
            unit,
            minValue,
            maxValue,
            description,
            createdBy,
        });
        const saved = await this.repo.save(measurementType);
        this.eventDispatcher.publish(new measurement_type_created_event_1.MeasurementTypeCreatedEvent(saved.id, saved.name, saved.unit));
        return saved;
    }
};
exports.CreateMeasurementTypeUseCase = CreateMeasurementTypeUseCase;
exports.CreateMeasurementTypeUseCase = CreateMeasurementTypeUseCase = __decorate([
    __param(0, (0, common_1.Inject)('IMeasurementTypeRepository')),
    __param(1, (0, common_1.Inject)('IEventDispatcher')),
    __metadata("design:paramtypes", [Object, Object])
], CreateMeasurementTypeUseCase);
//# sourceMappingURL=create-measurement-type.use-case.js.map