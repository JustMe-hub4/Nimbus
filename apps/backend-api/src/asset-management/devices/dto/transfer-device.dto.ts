import { IsUUID, IsNotEmpty } from 'class-validator';

export class TransferDeviceDto {
  @IsUUID()
  @IsNotEmpty()
  newStationId: string;

  @IsUUID()
  @IsNotEmpty()
  newOrganizationId: string;
}
