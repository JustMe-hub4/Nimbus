export class SensorProfile {
  public readonly id: string;
  public name: string;
  public manufacturer: string | null;
  public model: string | null;
  public communicationProtocol: string | null;
  public supportedMeasurementTypeIds: string[]; // will be handled via repository, but we keep it as a property for use cases
  public samplingInterval: number | null;
  public operatingVoltage: string | null;
  public calibrationRequired: boolean;
  public calibrationInstructions: string | null;
  public accuracyValue: number | null;
  public accuracyUnit: string | null;
  public accuracyCondition: string | null;
  public precisionValue: number | null;
  public precisionUnit: string | null;
  public datasheetUrl: string | null;
  public metadata: Record<string, any> | null;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;
  public createdBy: string | null;
  public updatedBy: string | null;

  constructor(props: Partial<SensorProfile>) {
    Object.assign(this, props);
    this.supportedMeasurementTypeIds = props.supportedMeasurementTypeIds || [];
    this.calibrationRequired = props.calibrationRequired ?? false;
  }
}
