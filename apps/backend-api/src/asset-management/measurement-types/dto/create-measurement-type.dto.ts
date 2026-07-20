import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateMeasurementTypeDto {
  @IsString()
  name: string;

  @IsString()
  unit: string;

  @IsOptional()
  @IsNumber()
  minValue?: number | null;

  @IsOptional()
  @IsNumber()
  maxValue?: number | null;

  @IsOptional()
  @IsString()
  description?: string | null;
}
