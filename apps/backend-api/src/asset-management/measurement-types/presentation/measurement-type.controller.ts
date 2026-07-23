import { Controller, Post, Get, Patch, Delete, Body, Param, Query, UseGuards, Inject, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { CreateMeasurementTypeDto } from '../dto/create-measurement-type.dto';
import { UpdateMeasurementTypeDto } from '../dto/update-measurement-type.dto';
import { CreateMeasurementTypeUseCase } from '../application/create-measurement-type.use-case';
import { ListMeasurementTypesUseCase } from '../application/list-measurement-types.use-case';
import { GetMeasurementTypeUseCase } from '../application/get-measurement-type.use-case';
import { UpdateMeasurementTypeUseCase } from '../application/update-measurement-type.use-case';
import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';

@Controller('measurement-types')
@UseGuards(JwtAuthGuard)
export class MeasurementTypeController {
  constructor(
    private createUseCase: CreateMeasurementTypeUseCase,
    private listUseCase: ListMeasurementTypesUseCase,
    private getUseCase: GetMeasurementTypeUseCase,
    private updateUseCase: UpdateMeasurementTypeUseCase,
    @Inject('IMeasurementTypeRepository') private mtRepo: IMeasurementTypeRepository,
  ) {}

  @Post()
  async create(@Body() body: CreateMeasurementTypeDto, @CurrentUser() user: any) {
    return this.createUseCase.execute({
      code: body.code,
      name: body.name,
      description: body.description,
      category: body.category,
      defaultUnitId: body.defaultUnitId,
      minValue: body.minValue,
      maxValue: body.maxValue,
      precision: body.precision,
      aggregationStrategy: body.aggregationStrategy,
      semanticDescription: body.semanticDescription,
      embeddingEligible: body.embeddingEligible,
      knowledgePriority: body.knowledgePriority,
      createdBy: user.sub,
    });
  }

  @Get()
  async list(@Query('category') category?: string) {
    return this.listUseCase.execute(category);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateMeasurementTypeDto, @CurrentUser() user: any) {
    return this.updateUseCase.execute(id, body, user.sub);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string, @CurrentUser() user: any) {
    await this.mtRepo.softDelete(id, user.sub);
  }
}
