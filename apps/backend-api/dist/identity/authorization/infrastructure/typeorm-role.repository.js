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
exports.TypeOrmRoleRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../domain/role.entity");
const role_orm_entity_1 = require("./role.orm.entity");
let TypeOrmRoleRepository = class TypeOrmRoleRepository {
    constructor(ormRepo) {
        this.ormRepo = ormRepo;
    }
    toDomain(orm) {
        return new role_entity_1.Role({
            id: orm.id,
            name: orm.name,
            description: orm.description,
            permissions: orm.permissions ? orm.permissions.map(p => new (require('../domain/permission.entity').Permission)(p)) : [],
            createdAt: orm.createdAt,
            updatedAt: orm.updatedAt,
        });
    }
    async save(role) {
        const ormEntity = this.ormRepo.create(role);
        const saved = await this.ormRepo.save(ormEntity);
        return this.toDomain(saved);
    }
    async findById(id) {
        const ormEntity = await this.ormRepo.findOne({
            where: { id },
            relations: { permissions: true },
        });
        return ormEntity ? this.toDomain(ormEntity) : null;
    }
    async findByName(name) {
        const ormEntity = await this.ormRepo.findOne({
            where: { name },
            relations: { permissions: true },
        });
        return ormEntity ? this.toDomain(ormEntity) : null;
    }
    async findAll() {
        const list = await this.ormRepo.find({ relations: { permissions: true } });
        return list.map(orm => this.toDomain(orm));
    }
};
exports.TypeOrmRoleRepository = TypeOrmRoleRepository;
exports.TypeOrmRoleRepository = TypeOrmRoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_orm_entity_1.RoleOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmRoleRepository);
//# sourceMappingURL=typeorm-role.repository.js.map