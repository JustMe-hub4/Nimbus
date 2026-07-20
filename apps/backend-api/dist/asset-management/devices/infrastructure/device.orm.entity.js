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
exports.DeviceOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const base_orm_entity_1 = require("../../../shared/infrastructure/base.orm.entity");
let DeviceOrmEntity = class DeviceOrmEntity extends base_orm_entity_1.BaseOrmEntity {
};
exports.DeviceOrmEntity = DeviceOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DeviceOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id' }),
    __metadata("design:type", String)
], DeviceOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'station_id' }),
    __metadata("design:type", String)
], DeviceOrmEntity.prototype, "stationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_profile_id', nullable: true }),
    __metadata("design:type", String)
], DeviceOrmEntity.prototype, "deviceProfileId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeviceOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'serial_number', unique: true }),
    __metadata("design:type", String)
], DeviceOrmEntity.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'firmware_version', nullable: true }),
    __metadata("design:type", String)
], DeviceOrmEntity.prototype, "firmwareVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hardware_revision', nullable: true }),
    __metadata("design:type", String)
], DeviceOrmEntity.prototype, "hardwareRevision", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'heartbeat_interval', nullable: true }),
    __metadata("design:type", Number)
], DeviceOrmEntity.prototype, "heartbeatInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_heartbeat', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], DeviceOrmEntity.prototype, "lastHeartbeat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'OFFLINE' }),
    __metadata("design:type", String)
], DeviceOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 100 }),
    __metadata("design:type", Number)
], DeviceOrmEntity.prototype, "health", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DeviceOrmEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_seen', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], DeviceOrmEntity.prototype, "firstSeen", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_seen', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], DeviceOrmEntity.prototype, "lastSeen", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_telemetry', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], DeviceOrmEntity.prototype, "lastTelemetry", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'connection_count', default: 0 }),
    __metadata("design:type", Number)
], DeviceOrmEntity.prototype, "connectionCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'restart_count', default: 0 }),
    __metadata("design:type", Number)
], DeviceOrmEntity.prototype, "restartCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'semantic_type', nullable: true }),
    __metadata("design:type", String)
], DeviceOrmEntity.prototype, "semanticType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'embedding_eligible', default: false }),
    __metadata("design:type", Boolean)
], DeviceOrmEntity.prototype, "embeddingEligible", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'knowledge_priority', default: 0 }),
    __metadata("design:type", Number)
], DeviceOrmEntity.prototype, "knowledgePriority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agent_readable', default: true }),
    __metadata("design:type", Boolean)
], DeviceOrmEntity.prototype, "agentReadable", void 0);
exports.DeviceOrmEntity = DeviceOrmEntity = __decorate([
    (0, typeorm_1.Entity)('devices'),
    (0, typeorm_1.Index)(['organizationId', 'stationId'])
], DeviceOrmEntity);
//# sourceMappingURL=device.orm.entity.js.map