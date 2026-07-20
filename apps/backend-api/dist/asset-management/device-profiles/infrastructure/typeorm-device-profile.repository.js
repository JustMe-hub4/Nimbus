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
exports.TypeOrmDeviceProfileRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const device_profile_entity_1 = require("../domain/device-profile.entity");
const device_profile_orm_entity_1 = require("./device-profile.orm.entity");
let TypeOrmDeviceProfileRepository = class TypeOrmDeviceProfileRepository {
    constructor(ormRepo) {
        this.ormRepo = ormRepo;
    }
    toDomain(orm) {
        return new device_profile_entity_1.DeviceProfile({
            id: orm.id,
            name: orm.name,
            description: orm.description,
            manufacturer: orm.manufacturer,
            model: orm.model,
            communicationProtocols: orm.communicationProtocols,
            supportedSensorTypes: orm.supportedSensorTypes,
            expectedMeasurements: orm.expectedMeasurements,
            firmwareCompatibility: orm.firmwareCompatibility,
            heartbeatDefaultInterval: orm.heartbeatDefaultInterval,
            calibrationRequired: orm.calibrationRequired,
            calibrationInstructions: orm.calibrationInstructions,
            metadata: orm.metadata,
            createdAt: orm.createdAt,
            updatedAt: orm.updatedAt,
            deletedAt: orm.deletedAt,
            createdBy: orm.createdBy,
            updatedBy: orm.updatedBy,
        });
    }
    async save(profile) {
        const ormEntity = this.ormRepo.create(profile);
        const saved = await this.ormRepo.save(ormEntity);
        return this.toDomain(saved);
    }
    async findById(id) {
        const orm = await this.ormRepo.findOne({ where: { id } });
        return orm ? this.toDomain(orm) : null;
    }
    async findByName(name) {
        const orm = await this.ormRepo.findOne({ where: { name } });
        return orm ? this.toDomain(orm) : null;
    }
    async findAll() {
        const list = await this.ormRepo.find();
        return list.map(orm => this.toDomain(orm));
    }
    async softDelete(id, deletedBy) {
        await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
    }
};
exports.TypeOrmDeviceProfileRepository = TypeOrmDeviceProfileRepository;
exports.TypeOrmDeviceProfileRepository = TypeOrmDeviceProfileRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_profile_orm_entity_1.DeviceProfileOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmDeviceProfileRepository);
//# sourceMappingURL=typeorm-device-profile.repository.js.map