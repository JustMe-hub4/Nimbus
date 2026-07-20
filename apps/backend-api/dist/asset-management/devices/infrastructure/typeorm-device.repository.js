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
exports.TypeOrmDeviceRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const device_entity_1 = require("../domain/device.entity");
const device_orm_entity_1 = require("./device.orm.entity");
let TypeOrmDeviceRepository = class TypeOrmDeviceRepository {
    constructor(ormRepo) {
        this.ormRepo = ormRepo;
    }
    toDomain(orm) {
        return new device_entity_1.Device({
            id: orm.id,
            organizationId: orm.organizationId,
            stationId: orm.stationId,
            deviceProfileId: orm.deviceProfileId,
            name: orm.name,
            serialNumber: orm.serialNumber,
            firmwareVersion: orm.firmwareVersion,
            hardwareRevision: orm.hardwareRevision,
            heartbeatInterval: orm.heartbeatInterval,
            lastHeartbeat: orm.lastHeartbeat,
            status: orm.status,
            metadata: orm.metadata,
            createdAt: orm.createdAt,
            updatedAt: orm.updatedAt,
            deletedAt: orm.deletedAt,
            createdBy: orm.createdBy,
            updatedBy: orm.updatedBy,
            deletedBy: orm.deletedBy,
        });
    }
    async save(device) {
        let ormEntity;
        if (device.id) {
            ormEntity = await this.ormRepo.preload({
                id: device.id,
                organizationId: device.organizationId,
                stationId: device.stationId,
                deviceProfileId: device.deviceProfileId,
                name: device.name,
                serialNumber: device.serialNumber,
                firmwareVersion: device.firmwareVersion,
                hardwareRevision: device.hardwareRevision,
                heartbeatInterval: device.heartbeatInterval,
                lastHeartbeat: device.lastHeartbeat,
                status: device.status,
                metadata: device.metadata,
                updatedBy: device.updatedBy,
                deletedAt: device.deletedAt,
                deletedBy: device.deletedBy,
            });
        }
        else {
            ormEntity = this.ormRepo.create({
                organizationId: device.organizationId,
                stationId: device.stationId,
                deviceProfileId: device.deviceProfileId,
                name: device.name,
                serialNumber: device.serialNumber,
                firmwareVersion: device.firmwareVersion,
                hardwareRevision: device.hardwareRevision,
                heartbeatInterval: device.heartbeatInterval,
                lastHeartbeat: device.lastHeartbeat,
                status: device.status,
                metadata: device.metadata,
                createdBy: device.createdBy,
                updatedBy: device.updatedBy,
            });
        }
        const saved = await this.ormRepo.save(ormEntity);
        return this.toDomain(saved);
    }
    async findById(id) {
        const orm = await this.ormRepo.findOne({ where: { id } });
        return orm ? this.toDomain(orm) : null;
    }
    async findBySerialNumber(serial) {
        const orm = await this.ormRepo.findOne({ where: { serialNumber: serial } });
        return orm ? this.toDomain(orm) : null;
    }
    async findByStation(stationId) {
        const list = await this.ormRepo.find({ where: { stationId } });
        return list.map(orm => this.toDomain(orm));
    }
    async findByOrganization(organizationId) {
        const list = await this.ormRepo.find({ where: { organizationId } });
        return list.map(orm => this.toDomain(orm));
    }
    async findAll() {
        const list = await this.ormRepo.find();
        return list.map(orm => this.toDomain(orm));
    }
    async softDelete(id, deletedBy) {
        await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
    }
};
exports.TypeOrmDeviceRepository = TypeOrmDeviceRepository;
exports.TypeOrmDeviceRepository = TypeOrmDeviceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_orm_entity_1.DeviceOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmDeviceRepository);
//# sourceMappingURL=typeorm-device.repository.js.map