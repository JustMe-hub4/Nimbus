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
exports.TypeOrmMeasurementTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const measurement_type_entity_1 = require("../domain/measurement-type.entity");
const measurement_type_orm_entity_1 = require("./measurement-type.orm.entity");
let TypeOrmMeasurementTypeRepository = class TypeOrmMeasurementTypeRepository {
    constructor(ormRepo) {
        this.ormRepo = ormRepo;
    }
    toDomain(orm) {
        return new measurement_type_entity_1.MeasurementType({
            id: orm.id,
            name: orm.name,
            unit: orm.unit,
            minValue: orm.minValue,
            maxValue: orm.maxValue,
            description: orm.description,
            createdAt: orm.createdAt,
            updatedAt: orm.updatedAt,
            deletedAt: orm.deletedAt,
            createdBy: orm.createdBy,
            updatedBy: orm.updatedBy,
            deletedBy: orm.deletedBy,
        });
    }
    async save(type) {
        const ormEntity = this.ormRepo.create({
            name: type.name,
            unit: type.unit,
            minValue: type.minValue,
            maxValue: type.maxValue,
            description: type.description,
            createdBy: type.createdBy,
        });
        const saved = await this.ormRepo.save(ormEntity);
        return this.toDomain(saved);
    }
    async findById(id) {
        const ormEntity = await this.ormRepo.findOne({ where: { id } });
        return ormEntity ? this.toDomain(ormEntity) : null;
    }
    async findByName(name) {
        const ormEntity = await this.ormRepo.findOne({ where: { name } });
        return ormEntity ? this.toDomain(ormEntity) : null;
    }
    async findAll() {
        const list = await this.ormRepo.find();
        return list.map(orm => this.toDomain(orm));
    }
    async softDelete(id, deletedBy) {
        await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
    }
};
exports.TypeOrmMeasurementTypeRepository = TypeOrmMeasurementTypeRepository;
exports.TypeOrmMeasurementTypeRepository = TypeOrmMeasurementTypeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(measurement_type_orm_entity_1.MeasurementTypeOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmMeasurementTypeRepository);
//# sourceMappingURL=typeorm-measurement-type.repository.js.map