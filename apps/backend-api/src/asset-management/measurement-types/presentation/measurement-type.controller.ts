import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { CreateMeasurementTypeUseCase } from '../application/create-measurement-type.use-case';
import { ListMeasurementTypesUseCase } from '../application/list-measurement-types.use-case';
import { GetMeasurementTypeUseCase } from '../application/get-measurement-type.use-case';
import { CreateMeasurementTypeDto } from '../dto/create-measurement-type.dto';
import { MeasurementTypeResponseDto } from '../dto/measurement-type-response.dto';
import { JwtAuthGuard } from '../../../identity/shared/guards/jwt-auth.guard';

@Controller('measurement-types')
@UseGuards(JwtAuthGuard)
export class MeasurementTypeController {
  constructor(
    private createUseCase: CreateMeasurementTypeUseCase,
    private listUseCase: ListMeasurementTypesUseCase,
    private getUseCase: GetMeasurementTypeUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateMeasurementTypeDto, @Req() req: any) {
    const userId = req.user?.sub;
    const result = await this.createUseCase.execute(
      dto.name,
      dto.unit,
      dto.minValue,
      dto.maxValue,
      dto.description,
      userId,
    );
    return MeasurementTypeResponseDto.fromDomain(result);
  }

  @Get()
  async list() {
    const results = await this.listUseCase.execute();
    return results.map(MeasurementTypeResponseDto.fromDomain);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.getUseCase.execute(id);
    return MeasurementTypeResponseDto.fromDomain(result);
  }
}
