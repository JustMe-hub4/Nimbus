export class DeviceValidator {
  static validateSerialNumber(serial: string): void {
    if (!serial || serial.trim().length === 0) {
      throw new Error('Serial number is required');
    }
    if (!/^[A-Z0-9-]+$/.test(serial)) {
      throw new Error('Serial number must contain only uppercase letters, numbers, and hyphens');
    }
  }

  static validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Device name is required');
    }
    if (name.length > 255) {
      throw new Error('Device name exceeds maximum length');
    }
  }
}
