export class DeviceProfile {
  public readonly id: string;
  public name: string; // e.g., 'Arduino Uno', 'ESP32'
  public description: string | null;
  public manufacturer: string | null;
  public model: string | null;
  public communicationProtocols: string[]; // e.g., ['MQTT', 'HTTP']
  public supportedSensorTypes: string[]; // e.g., ['temperature', 'humidity']
  public expectedMeasurements: string[]; // e.g., ['°C', '%']
  public firmwareCompatibility: string[]; // e.g., ['v1.x', 'v2.x']
  public heartbeatDefaultInterval: number;
  public calibrationRequired: boolean;
  public calibrationInstructions: string | null;
  public metadata: Record<string, any> | null;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;
  public createdBy: string | null;
  public updatedBy: string | null;

  constructor(props: Partial<DeviceProfile>) {
    Object.assign(this, props);
    this.communicationProtocols = props.communicationProtocols || [];
    this.supportedSensorTypes = props.supportedSensorTypes || [];
    this.expectedMeasurements = props.expectedMeasurements || [];
    this.firmwareCompatibility = props.firmwareCompatibility || [];
    this.heartbeatDefaultInterval = props.heartbeatDefaultInterval || 60;
    this.calibrationRequired = props.calibrationRequired ?? false;
  }
}
