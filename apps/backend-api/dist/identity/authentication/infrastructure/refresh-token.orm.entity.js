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
exports.RefreshTokenOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const base_orm_entity_1 = require("../../shared/infrastructure/base.orm.entity");
const user_orm_entity_1 = require("../../users/infrastructure/user.orm.entity");
let RefreshTokenOrmEntity = class RefreshTokenOrmEntity extends base_orm_entity_1.BaseOrmEntity {
};
exports.RefreshTokenOrmEntity = RefreshTokenOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RefreshTokenOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token_hash', unique: true }),
    __metadata("design:type", String)
], RefreshTokenOrmEntity.prototype, "tokenHash", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_orm_entity_1.UserOrmEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_orm_entity_1.UserOrmEntity)
], RefreshTokenOrmEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], RefreshTokenOrmEntity.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RefreshTokenOrmEntity.prototype, "revoked", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'replaced_by_token_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], RefreshTokenOrmEntity.prototype, "replacedByTokenId", void 0);
exports.RefreshTokenOrmEntity = RefreshTokenOrmEntity = __decorate([
    (0, typeorm_1.Entity)('refresh_tokens')
], RefreshTokenOrmEntity);
//# sourceMappingURL=refresh-token.orm.entity.js.map