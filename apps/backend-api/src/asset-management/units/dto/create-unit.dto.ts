import { IsString, IsOptional, IsObject, IsIn } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  symbol: string;

  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  dimension?: string;

  @IsString()
  @IsOptional()
  siEquivalent?: string;

  @IsObject()
  @IsOptional()
  conversionMetadata?: Record<string, any>;

  @IsObject()
  @IsOptional()
  precisionDefaults?: Record<string, any>;

  @IsIn(['ACTIVE', 'DEPRECATED', 'ARCHIVED'])
  @IsOptional()
  status?: 'ACTIVE' | 'DEPRECATED' | 'ARCHIVED';
}
