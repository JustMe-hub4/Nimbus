"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceDecommissionedEvent = void 0;
const domain_event_base_1 = require("../../../shared/events/domain-event.base");
class DeviceDecommissionedEvent extends domain_event_base_1.DomainEvent {
    constructor(deviceId, serialNumber) {
        super('DeviceDecommissioned', deviceId);
        this.deviceId = deviceId;
        this.serialNumber = serialNumber;
    }
}
exports.DeviceDecommissionedEvent = DeviceDecommissionedEvent;
//# sourceMappingURL=device-decommissioned.event.js.map