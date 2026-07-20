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
exports.StationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const create_station_use_case_1 = require("../application/create-station.use-case");
const list_stations_use_case_1 = require("../application/list-stations.use-case");
const get_station_use_case_1 = require("../application/get-station.use-case");
const current_user_decorator_1 = require("../../../shared/decorators/current-user.decorator");
let StationController = class StationController {
    constructor(createStationUseCase, listStationsUseCase, getStationUseCase) {
        this.createStationUseCase = createStationUseCase;
        this.listStationsUseCase = listStationsUseCase;
        this.getStationUseCase = getStationUseCase;
    }
    async create(body, user) {
        const station = await this.createStationUseCase.execute(body.name, body.organizationId, body.description, body.location, user.sub);
        return station;
    }
    async list(organizationId) {
        return this.listStationsUseCase.execute(organizationId);
    }
    async getById(id) {
        return this.getStationUseCase.execute(id);
    }
};
exports.StationController = StationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('organizationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "getById", null);
exports.StationController = StationController = __decorate([
    (0, common_1.Controller)('stations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_station_use_case_1.CreateStationUseCase,
        list_stations_use_case_1.ListStationsUseCase,
        get_station_use_case_1.GetStationUseCase])
], StationController);
//# sourceMappingURL=station.controller.js.map