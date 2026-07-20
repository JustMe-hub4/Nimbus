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
exports.TypeOrmPermissionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("../domain/permission.entity");
const permission_orm_entity_1 = require("./permission.orm.entity");
let TypeOrmPermissionRepository = class TypeOrmPermissionRepository {
    constructor(ormRepo) {
        this.ormRepo = ormRepo;
    }
    toDomain(orm) {
        return new permission_entity_1.Permission({
            id: orm.id,
            name: orm.name,
            description: orm.description,
            createdAt: orm.createdAt,
            updatedAt: orm.updatedAt,
        });
    }
    async save(permission) {
        const ormEntity = this.ormRepo.create(permission);
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
};
exports.TypeOrmPermissionRepository = TypeOrmPermissionRepository;
exports.TypeOrmPermissionRepository = TypeOrmPermissionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_orm_entity_1.PermissionOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmPermissionRepository);
//# sourceMappingURL=typeorm-permission.repository.js.map