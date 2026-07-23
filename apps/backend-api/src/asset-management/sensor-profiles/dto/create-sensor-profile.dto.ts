import { IsString, IsOptional, IsArray, IsUUID, IsNumber, IsBoolean, IsObject, IsIn } from 'class-validator';

export class CreateSensorProfileDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  manufacturer?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsIn(['I2C', 'SPI', 'UART', 'RS485', 'MODBUS', 'CAN', 'MQTT', 'LoRaWAN', 'BLE', 'ZIGBEE', 'THREAD', 'USB'])
  @IsOptional()
  communicationProtocol?: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  supportedMeasurementTypeIds?: string[];

  @IsNumber()
  @IsOptional()
  samplingInterval?: number;

  @IsString()
  @IsOptional()
  operatingVoltage?: string;

  @IsBoolean()
  @IsOptional()
  calibrationRequired?: boolean;

  @IsString()
  @IsOptional()
  calibrationInstructions?: string;

  @IsNumber()
  @IsOptional()
  accuracyValue?: number;

  @IsString()
  @IsOptional()
  accuracyUnit?: string;

  @IsString()
  @IsOptional()
  accuracyCondition?: string;

  @IsNumber()
  @IsOptional()
  precisionValue?: number;

  @IsString()
  @IsOptional()
  precisionUnit?: string;

  @IsString()
  @IsOptional()
  datasheetUrl?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
