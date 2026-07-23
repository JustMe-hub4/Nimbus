export class MeasurementType {
  public readonly id: string;
  public code: string;
  public name: string;
  public description: string | null;
  public category: string;
  public defaultUnitId: string;
  public minValue: number | null;
  public maxValue: number | null;
  public precision: number | null;
  public aggregationStrategy: 'AVG' | 'MAX' | 'MIN' | 'LAST' | 'SUM' | null;
  public semanticDescription: string | null;
  public embeddingEligible: boolean;
  public knowledgePriority: number;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;
  public createdBy: string | null;
  public updatedBy: string | null;
  public deletedBy: string | null;

  constructor(props: Partial<MeasurementType>) {
    Object.assign(this, props);
    this.embeddingEligible = props.embeddingEligible ?? false;
    this.knowledgePriority = props.knowledgePriority ?? 0;
  }
}
