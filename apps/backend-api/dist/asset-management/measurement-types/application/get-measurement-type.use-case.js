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
exports.GetMeasurementTypeUseCase = void 0;
const common_1 = require("@nestjs/common");
const app_exception_1 = require("../../../shared/exceptions/app.exception");
const error_codes_1 = require("../../../shared/exceptions/error-codes");
let GetMeasurementTypeUseCase = class GetMeasurementTypeUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        const measurementType = await this.repo.findById(id);
        if (!measurementType) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.MEASUREMENT_TYPE_NOT_FOUND, `Measurement type with ID ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return measurementType;
    }
};
exports.GetMeasurementTypeUseCase = GetMeasurementTypeUseCase;
exports.GetMeasurementTypeUseCase = GetMeasurementTypeUseCase = __decorate([
    __param(0, (0, common_1.Inject)('IMeasurementTypeRepository')),
    __metadata("design:paramtypes", [Object])
], GetMeasurementTypeUseCase);
//# sourceMappingURL=get-measurement-type.use-case.js.map