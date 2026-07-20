import { DeviceStatus } from './device-status.enum';

export class Device {
  public readonly id: string;
  public organizationId: string;
  public stationId: string;
  public deviceProfileId: string | null;
  public name: string;
  public serialNumber: string;
  public firmwareVersion: string | null;
  public hardwareRevision: string | null;
  public heartbeatInterval: number | null;
  public lastHeartbeat: Date | null;
  public status: DeviceStatus;
  public health: number;
  public metadata: Record<string, any> | null;
  public firstSeen: Date | null;
  public lastSeen: Date | null;
  public lastTelemetry: Date | null;
  public connectionCount: number;
  public restartCount: number;
  public semanticType: string | null;
  public embeddingEligible: boolean;
  public knowledgePriority: number;
  public agentReadable: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;
  public createdBy: string | null;
  public updatedBy: string | null;
  public deletedBy: string | null; // <-- added

  constructor(props: Partial<Device>) {
    Object.assign(this, props);
    this.status = props.status || DeviceStatus.OFFLINE;
    this.health = props.health ?? 100;
    this.connectionCount = props.connectionCount ?? 0;
    this.restartCount = props.restartCount ?? 0;
    this.embeddingEligible = props.embeddingEligible ?? false;
    this.knowledgePriority = props.knowledgePriority ?? 0;
    this.agentReadable = props.agentReadable ?? true;
    this.metadata = props.metadata || null;
  }

  public updateName(name: string): void {
    this.name = name;
  }

  public updateFirmware(version: string): void {
    this.firmwareVersion = version;
  }

  public updateHardware(revision: string): void {
    this.hardwareRevision = revision;
  }

  public updateHeartbeatInterval(interval: number): void {
    this.heartbeatInterval = interval;
  }

  public updateMetadata(metadata: Record<string, any>): void {
    this.metadata = metadata;
  }

  public setHeartbeat(heartbeat: Date): void {
    this.lastHeartbeat = heartbeat;
    this.status = DeviceStatus.ONLINE;
  }

  public updateStatus(status: DeviceStatus): void {
    this.status = status;
  }

  public setHealth(health: number): void {
    this.health = Math.min(100, Math.max(0, health));
  }

  public recordConnection(): void {
    this.connectionCount += 1;
    this.lastSeen = new Date();
    if (!this.firstSeen) this.firstSeen = new Date();
  }

  public recordTelemetry(): void {
    this.lastTelemetry = new Date();
  }

  public incrementRestart(): void {
    this.restartCount += 1;
  }

  public setSemanticType(type: string): void {
    this.semanticType = type;
  }

  public transfer(stationId: string, organizationId: string): void {
    this.stationId = stationId;
    this.organizationId = organizationId;
  }

  public decommission(): void {
    this.status = DeviceStatus.DECOMMISSIONED;
  }

  public softDelete(deletedBy: string): void {
    this.deletedAt = new Date();
    this.deletedBy = deletedBy;
  }
}
