import { CreateStationUseCase } from '../application/create-station.use-case';
import { ListStationsUseCase } from '../application/list-stations.use-case';
import { GetStationUseCase } from '../application/get-station.use-case';
export declare class StationController {
    private createStationUseCase;
    private listStationsUseCase;
    private getStationUseCase;
    constructor(createStationUseCase: CreateStationUseCase, listStationsUseCase: ListStationsUseCase, getStationUseCase: GetStationUseCase);
    create(body: {
        name: string;
        description?: string;
        location?: string;
        organizationId: string;
    }, user: any): Promise<import("../domain/station.entity").Station>;
    list(organizationId?: string): Promise<import("../domain/station.entity").Station[]>;
    getById(id: string): Promise<import("../domain/station.entity").Station>;
}
