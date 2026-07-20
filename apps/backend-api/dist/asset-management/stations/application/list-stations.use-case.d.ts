import { IStationRepository } from '../domain/station.repository.interface';
export declare class ListStationsUseCase {
    private stationRepo;
    constructor(stationRepo: IStationRepository);
    execute(organizationId?: string): Promise<import("../domain/station.entity").Station[]>;
}
