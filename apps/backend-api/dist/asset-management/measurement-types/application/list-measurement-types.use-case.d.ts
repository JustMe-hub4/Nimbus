import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';
export declare class ListMeasurementTypesUseCase {
    private repo;
    constructor(repo: IMeasurementTypeRepository);
    execute(): Promise<import("../domain/measurement-type.entity").MeasurementType[]>;
}
