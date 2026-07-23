import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Inject, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { CreateSensorProfileDto } from '../dto/create-sensor-profile.dto';
import { UpdateSensorProfileDto } from '../dto/update-sensor-profile.dto';
import { CreateSensorProfileUseCase } from '../application/create-sensor-profile.use-case';
import { ListSensorProfilesUseCase } from '../application/list-sensor-profiles.use-case';
import { GetSensorProfileUseCase } from '../application/get-sensor-profile.use-case';
import { UpdateSensorProfileUseCase } from '../application/update-sensor-profile.use-case';
import { ISensorProfileRepository } from '../domain/sensor-profile.repository.interface';

@Controller('sensor-profiles')
@UseGuards(JwtAuthGuard)
export class SensorProfileController {
  constructor(
    private createUseCase: CreateSensorProfileUseCase,
    private listUseCase: ListSensorProfilesUseCase,
    private getUseCase: GetSensorProfileUseCase,
    private updateUseCase: UpdateSensorProfileUseCase,
    @Inject('ISensorProfileRepository') private profileRepo: ISensorProfileRepository,
  ) {}

  @Post()
  async create(@Body() body: CreateSensorProfileDto, @CurrentUser() user: any) {
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateSensorProfileDto, @CurrentUser() user: any) {
    return this.updateUseCase.execute(id, body, user.sub);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string, @CurrentUser() user: any) {
    await this.profileRepo.softDelete(id, user.sub);
  }
}
