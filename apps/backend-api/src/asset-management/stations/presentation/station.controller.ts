import { Controller, Post, Get, Body, Param, Query, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CreateStationUseCase } from '../application/create-station.use-case';
import { ListStationsUseCase } from '../application/list-stations.use-case';
import { GetStationUseCase } from '../application/get-station.use-case';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';

@Controller('stations')
@UseGuards(JwtAuthGuard)
export class StationController {
  constructor(
    private createStationUseCase: CreateStationUseCase,
    private listStationsUseCase: ListStationsUseCase,
    private getStationUseCase: GetStationUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: { name: string; description?: string; location?: string; organizationId: string },
    @CurrentUser() user: any,
  ) {
    const station = await this.createStationUseCase.execute(
      body.name,
      body.organizationId,
      body.description,
      body.location,
      user.sub,
    );
    return station;
  }

  @Get()
  async list(@Query('organizationId') organizationId?: string) {
    return this.listStationsUseCase.execute(organizationId);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getStationUseCase.execute(id);
  }
}
