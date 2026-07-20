import { IsString, IsOptional, IsNumber, IsObject, MaxLength } from 'class-validator';
import { DeviceStatus } from '../domain/device-status.enum';

export class UpdateDeviceDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

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

  @IsString()
  @IsOptional()
  status?: DeviceStatus;
}
