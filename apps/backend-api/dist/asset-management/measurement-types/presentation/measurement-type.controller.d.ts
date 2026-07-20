import { CreateMeasurementTypeUseCase } from '../application/create-measurement-type.use-case';
import { ListMeasurementTypesUseCase } from '../application/list-measurement-types.use-case';
import { GetMeasurementTypeUseCase } from '../application/get-measurement-type.use-case';
import { CreateMeasurementTypeDto } from '../dto/create-measurement-type.dto';
import { MeasurementTypeResponseDto } from '../dto/measurement-type-response.dto';
export declare class MeasurementTypeController {
    private createUseCase;
    private listUseCase;
    private getUseCase;
    constructor(createUseCase: CreateMeasurementTypeUseCase, listUseCase: ListMeasurementTypesUseCase, getUseCase: GetMeasurementTypeUseCase);
    create(dto: CreateMeasurementTypeDto, req: any): Promise<MeasurementTypeResponseDto>;
    list(): Promise<MeasurementTypeResponseDto[]>;
    getById(id: string): Promise<MeasurementTypeResponseDto>;
}
