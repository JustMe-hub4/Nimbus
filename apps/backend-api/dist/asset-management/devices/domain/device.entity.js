"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const device_status_enum_1 = require("./device-status.enum");
class Device {
    constructor(props) {
        Object.assign(this, props);
        this.status = props.status || device_status_enum_1.DeviceStatus.OFFLINE;
        this.health = props.health ?? 100;
        this.connectionCount = props.connectionCount ?? 0;
        this.restartCount = props.restartCount ?? 0;
        this.embeddingEligible = props.embeddingEligible ?? false;
        this.knowledgePriority = props.knowledgePriority ?? 0;
        this.agentReadable = props.agentReadable ?? true;
        this.metadata = props.metadata || null;
    }
    updateName(name) {
        this.name = name;
    }
    updateFirmware(version) {
        this.firmwareVersion = version;
    }
    updateHardware(revision) {
        this.hardwareRevision = revision;
    }
    updateHeartbeatInterval(interval) {
        this.heartbeatInterval = interval;
    }
    updateMetadata(metadata) {
        this.metadata = metadata;
    }
    setHeartbeat(heartbeat) {
        this.lastHeartbeat = heartbeat;
        this.status = device_status_enum_1.DeviceStatus.ONLINE;
    }
    updateStatus(status) {
        this.status = status;
    }
    setHealth(health) {
        this.health = Math.min(100, Math.max(0, health));
    }
    recordConnection() {
        this.connectionCount += 1;
        this.lastSeen = new Date();
        if (!this.firstSeen)
            this.firstSeen = new Date();
    }
    recordTelemetry() {
        this.lastTelemetry = new Date();
    }
    incrementRestart() {
        this.restartCount += 1;
    }
    setSemanticType(type) {
        this.semanticType = type;
    }
    transfer(stationId, organizationId) {
        this.stationId = stationId;
        this.organizationId = organizationId;
    }
    decommission() {
        this.status = device_status_enum_1.DeviceStatus.DECOMMISSIONED;
    }
    softDelete(deletedBy) {
        this.deletedAt = new Date();
        this.deletedBy = deletedBy;
    }
}
exports.Device = Device;
//# sourceMappingURL=device.entity.js.map