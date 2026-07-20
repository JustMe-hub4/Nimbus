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
exports.TypeOrmMembershipRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const membership_entity_1 = require("../domain/membership.entity");
const membership_orm_entity_1 = require("./membership.orm.entity");
const user_entity_1 = require("../../users/domain/user.entity");
const organization_entity_1 = require("../../organizations/domain/organization.entity");
const role_entity_1 = require("../../authorization/domain/role.entity");
let TypeOrmMembershipRepository = class TypeOrmMembershipRepository {
    constructor(ormRepo) {
        this.ormRepo = ormRepo;
    }
    toDomain(orm) {
        return new membership_entity_1.Membership({
            id: orm.id,
            user: orm.user ? new user_entity_1.User({ id: orm.user.id, email: orm.user.email, fullName: orm.user.fullName }) : null,
            organization: orm.organization ? new organization_entity_1.Organization({ id: orm.organization.id, name: orm.organization.name, slug: orm.organization.slug }) : null,
            role: orm.role ? new role_entity_1.Role({ id: orm.role.id, name: orm.role.name }) : null,
            createdAt: orm.createdAt,
            updatedAt: orm.updatedAt,
            deletedAt: orm.deletedAt,
            createdBy: orm.createdBy,
            updatedBy: orm.updatedBy,
        });
    }
    async save(membership) {
        const ormEntity = this.ormRepo.create({
            user: { id: membership.user.id },
            organization: { id: membership.organization.id },
            role: membership.role ? { id: membership.role.id } : null,
            createdBy: membership.createdBy,
        });
        const saved = await this.ormRepo.save(ormEntity);
        return this.toDomain(saved);
    }
    async findByUserAndOrg(userId, orgId) {
        const ormEntity = await this.ormRepo.findOne({
            where: { user: { id: userId }, organization: { id: orgId } },
            relations: { user: true, organization: true, role: true },
        });
        return ormEntity ? this.toDomain(ormEntity) : null;
    }
    async findByUser(userId) {
        const list = await this.ormRepo.find({
            where: { user: { id: userId } },
            relations: { user: true, organization: true, role: true },
        });
        return list.map(orm => this.toDomain(orm));
    }
    async findByOrg(orgId) {
        const list = await this.ormRepo.find({
            where: { organization: { id: orgId } },
            relations: { user: true, organization: true, role: true },
        });
        return list.map(orm => this.toDomain(orm));
    }
    async softDelete(id, deletedBy) {
        await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
    }
};
exports.TypeOrmMembershipRepository = TypeOrmMembershipRepository;
exports.TypeOrmMembershipRepository = TypeOrmMembershipRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(membership_orm_entity_1.MembershipOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmMembershipRepository);
//# sourceMappingURL=typeorm-membership.repository.js.map