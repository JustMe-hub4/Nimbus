import { Controller, Post, Get, Patch, Delete, Body, Param, Query, UseGuards, Inject, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { CreateUnitUseCase } from '../application/create-unit.use-case';
import { ListUnitsUseCase } from '../application/list-units.use-case';
import { GetUnitUseCase } from '../application/get-unit.use-case';
import { UpdateUnitUseCase } from '../application/update-unit.use-case';
import { IUnitRepository } from '../domain/unit.repository.interface';

@Controller('units')
@UseGuards(JwtAuthGuard)
export class UnitController {
  constructor(
    private createUseCase: CreateUnitUseCase,
    private listUseCase: ListUnitsUseCase,
    private getUseCase: GetUnitUseCase,
    private updateUseCase: UpdateUnitUseCase,
    @Inject('IUnitRepository') private unitRepo: IUnitRepository,
  ) {}

  @Post()
  async create(@Body() body: CreateUnitDto, @CurrentUser() user: any) {
    return this.createUseCase.execute({
      ...body,
      createdBy: user.sub,
    });
  }

  @Get()
  async list(@Query('activeOnly') activeOnly: boolean = false) {
    return this.listUseCase.execute(activeOnly);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUnitDto, @CurrentUser() user: any) {
    return this.updateUseCase.execute(id, body, user.sub);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string, @CurrentUser() user: any) {
    await this.unitRepo.softDelete(id, user.sub);
  }
}
