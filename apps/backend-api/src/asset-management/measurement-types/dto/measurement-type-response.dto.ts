import { MeasurementType } from '../domain/measurement-type.entity';

export class MeasurementTypeResponseDto {
  id: string;
  name: string;
  unit: string;
  minValue: number | null;
  maxValue: number | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  static fromDomain(type: MeasurementType): MeasurementTypeResponseDto {
    return {
      id: type.id,
      name: type.name,
      unit: type.unit,
      minValue: type.minValue,
      maxValue: type.maxValue,
      description: type.description,
      createdAt: type.createdAt,
      updatedAt: type.updatedAt,
    };
  }
}
