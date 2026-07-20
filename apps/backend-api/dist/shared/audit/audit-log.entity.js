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
exports.AuditLogOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const base_orm_entity_1 = require("../infrastructure/base.orm.entity");
let AuditLogOrmEntity = class AuditLogOrmEntity extends base_orm_entity_1.BaseOrmEntity {
};
exports.AuditLogOrmEntity = AuditLogOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'aggregate_type' }),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "aggregateType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'aggregate_id' }),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "aggregateId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'old_value', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AuditLogOrmEntity.prototype, "oldValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_value', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AuditLogOrmEntity.prototype, "newValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'changed_by' }),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "changedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_address', nullable: true }),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_agent', nullable: true }),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "userAgent", void 0);
exports.AuditLogOrmEntity = AuditLogOrmEntity = __decorate([
    (0, typeorm_1.Entity)('audit_logs')
], AuditLogOrmEntity);
//# sourceMappingURL=audit-log.entity.js.map