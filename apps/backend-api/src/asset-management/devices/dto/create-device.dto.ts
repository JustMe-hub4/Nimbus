import { IsString, IsUUID, IsOptional, IsNumber, IsObject, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDeviceDto {
  @IsUUID()
  @IsNotEmpty()
  organizationId: string;

  @IsUUID()
  @IsNotEmpty()
  stationId: string;

  @IsUUID()
  @IsOptional()
  deviceProfileId?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsString()
  @IsOptional()
  firmwareVersion?: string;

  @IsString()
  @IsOptional()
  hardwareRevision?: string;

  @IsNumber()
  @IsOptional()
  heartbeatInterval?: number;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
