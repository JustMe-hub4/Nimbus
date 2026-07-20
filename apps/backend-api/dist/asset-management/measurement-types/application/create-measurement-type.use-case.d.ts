import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';
import { MeasurementType } from '../domain/measurement-type.entity';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
export declare class CreateMeasurementTypeUseCase {
    private repo;
    private eventDispatcher;
    constructor(repo: IMeasurementTypeRepository, eventDispatcher: IEventDispatcher);
    execute(name: string, unit: string, minValue: number | null, maxValue: number | null, description: string | null, createdBy: string): Promise<MeasurementType>;
}
