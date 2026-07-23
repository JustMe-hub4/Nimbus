export class Unit {
  public readonly id: string;
  public symbol: string;
  public name: string;
  public category: string;
  public dimension: string | null;
  public siEquivalent: string | null;
  public conversionMetadata: Record<string, any> | null;
  public precisionDefaults: Record<string, any> | null;
  public status: 'ACTIVE' | 'DEPRECATED' | 'ARCHIVED';
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;
  public createdBy: string | null;
  public updatedBy: string | null;

  constructor(props: Partial<Unit>) {
    Object.assign(this, props);
    this.status = props.status || 'ACTIVE';
  }
}
