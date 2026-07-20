"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceHeartbeatReceivedEvent = void 0;
const domain_event_base_1 = require("../../../shared/events/domain-event.base");
class DeviceHeartbeatReceivedEvent extends domain_event_base_1.DomainEvent {
    constructor(deviceId, heartbeatTimestamp) {
        super('DeviceHeartbeatReceived', deviceId);
        this.deviceId = deviceId;
        this.heartbeatTimestamp = heartbeatTimestamp;
    }
}
exports.DeviceHeartbeatReceivedEvent = DeviceHeartbeatReceivedEvent;
//# sourceMappingURL=device-heartbeat-received.event.js.map