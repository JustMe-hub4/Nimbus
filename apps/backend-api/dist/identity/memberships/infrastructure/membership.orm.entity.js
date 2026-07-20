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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const base_orm_entity_1 = require("../../shared/infrastructure/base.orm.entity");
const user_orm_entity_1 = require("../../users/infrastructure/user.orm.entity");
const organization_orm_entity_1 = require("../../organizations/infrastructure/organization.orm.entity");
const role_orm_entity_1 = require("../../authorization/infrastructure/role.orm.entity");
let MembershipOrmEntity = class MembershipOrmEntity extends base_orm_entity_1.BaseOrmEntity {
};
exports.MembershipOrmEntity = MembershipOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MembershipOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_orm_entity_1.UserOrmEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_orm_entity_1.UserOrmEntity)
], MembershipOrmEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_orm_entity_1.OrganizationOrmEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'organization_id' }),
    __metadata("design:type", organization_orm_entity_1.OrganizationOrmEntity)
], MembershipOrmEntity.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_orm_entity_1.RoleOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", role_orm_entity_1.RoleOrmEntity)
], MembershipOrmEntity.prototype, "role", void 0);
exports.MembershipOrmEntity = MembershipOrmEntity = __decorate([
    (0, typeorm_1.Entity)('memberships')
], MembershipOrmEntity);
//# sourceMappingURL=membership.orm.entity.js.map