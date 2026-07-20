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
exports.RoleOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const base_orm_entity_1 = require("../../shared/infrastructure/base.orm.entity");
const permission_orm_entity_1 = require("./permission.orm.entity");
let RoleOrmEntity = class RoleOrmEntity extends base_orm_entity_1.BaseOrmEntity {
};
exports.RoleOrmEntity = RoleOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RoleOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], RoleOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RoleOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => permission_orm_entity_1.PermissionOrmEntity),
    (0, typeorm_1.JoinTable)({
        name: 'role_permissions',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], RoleOrmEntity.prototype, "permissions", void 0);
exports.RoleOrmEntity = RoleOrmEntity = __decorate([
    (0, typeorm_1.Entity)('roles')
], RoleOrmEntity);
//# sourceMappingURL=role.orm.entity.js.map