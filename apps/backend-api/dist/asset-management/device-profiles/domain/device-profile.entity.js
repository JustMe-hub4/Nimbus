"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceProfile = void 0;
class DeviceProfile {
    constructor(props) {
        Object.assign(this, props);
        this.communicationProtocols = props.communicationProtocols || [];
        this.supportedSensorTypes = props.supportedSensorTypes || [];
        this.expectedMeasurements = props.expectedMeasurements || [];
        this.firmwareCompatibility = props.firmwareCompatibility || [];
        this.heartbeatDefaultInterval = props.heartbeatDefaultInterval || 60;
        this.calibrationRequired = props.calibrationRequired ?? false;
    }
}
exports.DeviceProfile = DeviceProfile;
//# sourceMappingURL=device-profile.entity.js.map