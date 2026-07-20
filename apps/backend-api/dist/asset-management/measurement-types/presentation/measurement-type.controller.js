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
exports.MeasurementTypeController = void 0;
const common_1 = require("@nestjs/common");
const create_measurement_type_use_case_1 = require("../application/create-measurement-type.use-case");
const list_measurement_types_use_case_1 = require("../application/list-measurement-types.use-case");
const get_measurement_type_use_case_1 = require("../application/get-measurement-type.use-case");
const create_measurement_type_dto_1 = require("../dto/create-measurement-type.dto");
const measurement_type_response_dto_1 = require("../dto/measurement-type-response.dto");
const jwt_auth_guard_1 = require("../../../identity/shared/guards/jwt-auth.guard");
let MeasurementTypeController = class MeasurementTypeController {
    constructor(createUseCase, listUseCase, getUseCase) {
        this.createUseCase = createUseCase;
        this.listUseCase = listUseCase;
        this.getUseCase = getUseCase;
    }
    async create(dto, req) {
        const userId = req.user?.sub;
        const result = await this.createUseCase.execute(dto.name, dto.unit, dto.minValue, dto.maxValue, dto.description, userId);
        return measurement_type_response_dto_1.MeasurementTypeResponseDto.fromDomain(result);
    }
    async list() {
        const results = await this.listUseCase.execute();
        return results.map(measurement_type_response_dto_1.MeasurementTypeResponseDto.fromDomain);
    }
    async getById(id) {
        const result = await this.getUseCase.execute(id);
        return measurement_type_response_dto_1.MeasurementTypeResponseDto.fromDomain(result);
    }
};
exports.MeasurementTypeController = MeasurementTypeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_measurement_type_dto_1.CreateMeasurementTypeDto, Object]),
    __metadata("design:returntype", Promise)
], MeasurementTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MeasurementTypeController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeasurementTypeController.prototype, "getById", null);
exports.MeasurementTypeController = MeasurementTypeController = __decorate([
    (0, common_1.Controller)('measurement-types'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_measurement_type_use_case_1.CreateMeasurementTypeUseCase,
        list_measurement_types_use_case_1.ListMeasurementTypesUseCase,
        get_measurement_type_use_case_1.GetMeasurementTypeUseCase])
], MeasurementTypeController);
//# sourceMappingURL=measurement-type.controller.js.map