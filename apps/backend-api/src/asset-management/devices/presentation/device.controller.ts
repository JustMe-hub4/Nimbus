import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { TransferDeviceDto } from '../dto/transfer-device.dto';
import { RegisterDeviceUseCase } from '../application/register-device.use-case';
import { ListDevicesUseCase } from '../application/list-devices.use-case';
import { GetDeviceUseCase } from '../application/get-device.use-case';
import { UpdateDeviceUseCase } from '../application/update-device.use-case';
import { TransferDeviceUseCase } from '../application/transfer-device.use-case';
import { DecommissionDeviceUseCase } from '../application/decommission-device.use-case';

@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DeviceController {
  constructor(
    private registerDeviceUseCase: RegisterDeviceUseCase,
    private listDevicesUseCase: ListDevicesUseCase,
    private getDeviceUseCase: GetDeviceUseCase,
    private updateDeviceUseCase: UpdateDeviceUseCase,
    private transferDeviceUseCase: TransferDeviceUseCase,
    private decommissionDeviceUseCase: DecommissionDeviceUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateDeviceDto, @CurrentUser() user: any) {
    const device = await this.registerDeviceUseCase.execute({
      organizationId: body.organizationId,
      stationId: body.stationId,
      deviceProfileId: body.deviceProfileId,
      name: body.name,
      serialNumber: body.serialNumber,
      firmwareVersion: body.firmwareVersion,
      hardwareRevision: body.hardwareRevision,
      heartbeatInterval: body.heartbeatInterval,
      metadata: body.metadata,
      createdBy: user.sub,
    });
    return device;
  }

  @Get()
  async list(@Query('stationId') stationId?: string, @Query('organizationId') organizationId?: string) {
    return this.listDevicesUseCase.execute({ stationId, organizationId });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getDeviceUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateDeviceDto, @CurrentUser() user: any) {
    return this.updateDeviceUseCase.execute(id, body, user.sub);
  }

  @Post(':id/transfer')
  @HttpCode(HttpStatus.OK)
  async transfer(@Param('id') id: string, @Body() body: TransferDeviceDto, @CurrentUser() user: any) {
    return this.transferDeviceUseCase.execute(id, body.newStationId, body.newOrganizationId, user.sub);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async decommission(@Param('id') id: string, @CurrentUser() user: any) {
    await this.decommissionDeviceUseCase.execute(id, user.sub);
  }
}
