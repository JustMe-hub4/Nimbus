export declare class TelemetryService {
    getLatest(): Promise<{
        count: any;
        data: any;
    }>;
    getStats(): Promise<{
        devices: any;
    }>;
}
