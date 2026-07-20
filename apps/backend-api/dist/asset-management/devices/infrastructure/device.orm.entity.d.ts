import { BaseOrmEntity } from '../../../shared/infrastructure/base.orm.entity';
export declare class DeviceOrmEntity extends BaseOrmEntity {
    id: string;
    organizationId: string;
    stationId: string;
    deviceProfileId: string | null;
    name: string;
    serialNumber: string;
    firmwareVersion: string | null;
    hardwareRevision: string | null;
    heartbeatInterval: number | null;
    lastHeartbeat: Date | null;
    status: string;
    health: number;
    metadata: Record<string, any> | null;
    firstSeen: Date | null;
    lastSeen: Date | null;
    lastTelemetry: Date | null;
    connectionCount: number;
    restartCount: number;
    semanticType: string | null;
    embeddingEligible: boolean;
    knowledgePriority: number;
    agentReadable: boolean;
}
