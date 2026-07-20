import { TelemetryService } from './telemetry.service';
export declare class TelemetryController {
    private readonly telemetryService;
    constructor(telemetryService: TelemetryService);
    getLatest(): Promise<{
        count: any;
        data: any;
    }>;
    getStats(): Promise<{
        devices: any;
    }>;
}
