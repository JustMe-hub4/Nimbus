import { IStationRepository } from '../domain/station.repository.interface';
export declare class GetStationUseCase {
    private stationRepo;
    constructor(stationRepo: IStationRepository);
    execute(id: string): Promise<import("../domain/station.entity").Station>;
}
