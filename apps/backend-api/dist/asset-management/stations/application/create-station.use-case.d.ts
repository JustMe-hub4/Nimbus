import { IStationRepository } from '../domain/station.repository.interface';
import { Station } from '../domain/station.entity';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
export declare class CreateStationUseCase {
    private stationRepo;
    private eventDispatcher;
    constructor(stationRepo: IStationRepository, eventDispatcher: IEventDispatcher);
    execute(name: string, organizationId: string, description?: string | null, location?: string | null, createdBy?: string): Promise<Station>;
}
