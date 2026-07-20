"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceTransferredEvent = void 0;
const domain_event_base_1 = require("../../../shared/events/domain-event.base");
class DeviceTransferredEvent extends domain_event_base_1.DomainEvent {
    constructor(deviceId, oldStationId, newStationId, oldOrganizationId, newOrganizationId) {
        super('DeviceTransferred', deviceId);
        this.deviceId = deviceId;
        this.oldStationId = oldStationId;
        this.newStationId = newStationId;
        this.oldOrganizationId = oldOrganizationId;
        this.newOrganizationId = newOrganizationId;
    }
}
exports.DeviceTransferredEvent = DeviceTransferredEvent;
//# sourceMappingURL=device-transferred.event.js.map