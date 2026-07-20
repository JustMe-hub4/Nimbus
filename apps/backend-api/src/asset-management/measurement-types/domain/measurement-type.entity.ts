export class MeasurementType {
  public readonly id: string;
  public name: string;
  public unit: string;
  public minValue: number | null;
  public maxValue: number | null;
  public description: string | null;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;
  public createdBy: string | null;
  public updatedBy: string | null;
  public deletedBy: string | null;

  constructor(props: Partial<MeasurementType>) {
    Object.assign(this, props);
  }

  public updateName(name: string): void {
    this.name = name;
  }

  public updateUnit(unit: string): void {
    this.unit = unit;
  }

  public updateRange(min: number | null, max: number | null): void {
    this.minValue = min;
    this.maxValue = max;
  }

  public updateDescription(description: string | null): void {
    this.description = description;
  }
}
