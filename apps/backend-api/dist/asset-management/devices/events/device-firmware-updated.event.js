"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceFirmwareUpdatedEvent = void 0;
const domain_event_base_1 = require("../../../shared/events/domain-event.base");
class DeviceFirmwareUpdatedEvent extends domain_event_base_1.DomainEvent {
    constructor(deviceId, oldVersion, newVersion) {
        super('DeviceFirmwareUpdated', deviceId);
        this.deviceId = deviceId;
        this.oldVersion = oldVersion;
        this.newVersion = newVersion;
    }
}
exports.DeviceFirmwareUpdatedEvent = DeviceFirmwareUpdatedEvent;
//# sourceMappingURL=device-firmware-updated.event.js.map