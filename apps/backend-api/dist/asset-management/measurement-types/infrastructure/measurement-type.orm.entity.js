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
exports.MeasurementTypeOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const base_orm_entity_1 = require("../../../shared/infrastructure/base.orm.entity");
let MeasurementTypeOrmEntity = class MeasurementTypeOrmEntity extends base_orm_entity_1.BaseOrmEntity {
};
exports.MeasurementTypeOrmEntity = MeasurementTypeOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MeasurementTypeOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], MeasurementTypeOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MeasurementTypeOrmEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'min_value', type: 'float', nullable: true }),
    __metadata("design:type", Number)
], MeasurementTypeOrmEntity.prototype, "minValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_value', type: 'float', nullable: true }),
    __metadata("design:type", Number)
], MeasurementTypeOrmEntity.prototype, "maxValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MeasurementTypeOrmEntity.prototype, "description", void 0);
exports.MeasurementTypeOrmEntity = MeasurementTypeOrmEntity = __decorate([
    (0, typeorm_1.Entity)('measurement_types')
], MeasurementTypeOrmEntity);
//# sourceMappingURL=measurement-type.orm.entity.js.map