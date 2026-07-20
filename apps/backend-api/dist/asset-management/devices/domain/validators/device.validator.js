"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceValidator = void 0;
class DeviceValidator {
    static validateSerialNumber(serial) {
        if (!serial || serial.trim().length === 0) {
            throw new Error('Serial number is required');
        }
        if (!/^[A-Z0-9-]+$/.test(serial)) {
            throw new Error('Serial number must contain only uppercase letters, numbers, and hyphens');
        }
    }
    static validateName(name) {
        if (!name || name.trim().length === 0) {
            throw new Error('Device name is required');
        }
        if (name.length > 255) {
            throw new Error('Device name exceeds maximum length');
        }
    }
}
exports.DeviceValidator = DeviceValidator;
//# sourceMappingURL=device.validator.js.map