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
exports.DeviceProfileOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const base_orm_entity_1 = require("../../../shared/infrastructure/base.orm.entity");
let DeviceProfileOrmEntity = class DeviceProfileOrmEntity extends base_orm_entity_1.BaseOrmEntity {
};
exports.DeviceProfileOrmEntity = DeviceProfileOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DeviceProfileOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], DeviceProfileOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DeviceProfileOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DeviceProfileOrmEntity.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DeviceProfileOrmEntity.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'communication_protocols', type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], DeviceProfileOrmEntity.prototype, "communicationProtocols", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supported_sensor_types', type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], DeviceProfileOrmEntity.prototype, "supportedSensorTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_measurements', type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], DeviceProfileOrmEntity.prototype, "expectedMeasurements", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'firmware_compatibility', type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], DeviceProfileOrmEntity.prototype, "firmwareCompatibility", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'heartbeat_default_interval', default: 60 }),
    __metadata("design:type", Number)
], DeviceProfileOrmEntity.prototype, "heartbeatDefaultInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'calibration_required', default: false }),
    __metadata("design:type", Boolean)
], DeviceProfileOrmEntity.prototype, "calibrationRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'calibration_instructions', nullable: true }),
    __metadata("design:type", String)
], DeviceProfileOrmEntity.prototype, "calibrationInstructions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DeviceProfileOrmEntity.prototype, "metadata", void 0);
exports.DeviceProfileOrmEntity = DeviceProfileOrmEntity = __decorate([
    (0, typeorm_1.Entity)('device_profiles')
], DeviceProfileOrmEntity);
//# sourceMappingURL=device-profile.orm.entity.js.map