import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { CreateDeviceProfileUseCase } from '../application/create-device-profile.use-case';
import { ListDeviceProfilesUseCase } from '../application/list-device-profiles.use-case';
import { GetDeviceProfileUseCase } from '../application/get-device-profile.use-case';
import { CreateDeviceProfileDto } from '../dto/create-device-profile.dto';

@Controller('device-profiles')
@UseGuards(JwtAuthGuard)
export class DeviceProfileController {
  constructor(
    private createUseCase: CreateDeviceProfileUseCase,
    private listUseCase: ListDeviceProfilesUseCase,
    private getUseCase: GetDeviceProfileUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateDeviceProfileDto, @CurrentUser() user: any) {
    return this.createUseCase.execute({
      ...body,
      createdBy: user.sub,
    });
  }

  @Get()
  async list() {
    return this.listUseCase.execute();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getUseCase.execute(id);
  }
}
