"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRegisteredEvent = void 0;
const domain_event_base_1 = require("../../../shared/events/domain-event.base");
class DeviceRegisteredEvent extends domain_event_base_1.DomainEvent {
    constructor(deviceId, serialNumber, name, organizationId, stationId) {
        super('DeviceRegistered', deviceId);
        this.deviceId = deviceId;
        this.serialNumber = serialNumber;
        this.name = name;
        this.organizationId = organizationId;
        this.stationId = stationId;
    }
}
exports.DeviceRegisteredEvent = DeviceRegisteredEvent;
//# sourceMappingURL=device-registered.event.js.map