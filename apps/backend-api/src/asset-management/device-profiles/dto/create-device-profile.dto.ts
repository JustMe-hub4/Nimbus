import { IsString, IsOptional, IsArray, IsBoolean, IsNumber, IsObject } from 'class-validator';

export class CreateDeviceProfileDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  manufacturer?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsArray()
  @IsOptional()
  communicationProtocols?: string[];

  @IsArray()
  @IsOptional()
  supportedSensorTypes?: string[];

  @IsArray()
  @IsOptional()
  expectedMeasurements?: string[];

  @IsArray()
  @IsOptional()
  firmwareCompatibility?: string[];

  @IsNumber()
  @IsOptional()
  heartbeatDefaultInterval?: number;

  @IsBoolean()
  @IsOptional()
  calibrationRequired?: boolean;

  @IsString()
  @IsOptional()
  calibrationInstructions?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
