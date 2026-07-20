import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';
export declare class GetMeasurementTypeUseCase {
    private repo;
    constructor(repo: IMeasurementTypeRepository);
    execute(id: string): Promise<import("../domain/measurement-type.entity").MeasurementType>;
}
