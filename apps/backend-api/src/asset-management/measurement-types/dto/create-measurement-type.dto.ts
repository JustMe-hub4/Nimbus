import { IsString, IsUUID, IsOptional, IsNumber, IsIn, IsBoolean } from 'class-validator';

export class CreateMeasurementTypeDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  category: string;

  @IsUUID()
  defaultUnitId: string;

  @IsNumber()
  @IsOptional()
  minValue?: number;

  @IsNumber()
  @IsOptional()
  maxValue?: number;

  @IsNumber()
  @IsOptional()
  precision?: number;

  @IsIn(['AVG', 'MAX', 'MIN', 'LAST', 'SUM'])
  @IsOptional()
  aggregationStrategy?: 'AVG' | 'MAX' | 'MIN' | 'LAST' | 'SUM';

  @IsString()
  @IsOptional()
  semanticDescription?: string;

  @IsBoolean()
  @IsOptional()
  embeddingEligible?: boolean;

  @IsNumber()
  @IsOptional()
  knowledgePriority?: number;
}
