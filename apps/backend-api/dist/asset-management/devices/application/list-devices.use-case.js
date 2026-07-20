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
exports.ListDevicesUseCase = void 0;
const common_1 = require("@nestjs/common");
let ListDevicesUseCase = class ListDevicesUseCase {
    constructor(deviceRepo) {
        this.deviceRepo = deviceRepo;
    }
    async execute(filters) {
        if (filters?.stationId) {
            return this.deviceRepo.findByStation(filters.stationId);
        }
        if (filters?.organizationId) {
            return this.deviceRepo.findByOrganization(filters.organizationId);
        }
        return this.deviceRepo.findAll();
    }
};
exports.ListDevicesUseCase = ListDevicesUseCase;
exports.ListDevicesUseCase = ListDevicesUseCase = __decorate([
    __param(0, (0, common_1.Inject)('IDeviceRepository')),
    __metadata("design:paramtypes", [Object])
], ListDevicesUseCase);
//# sourceMappingURL=list-devices.use-case.js.map