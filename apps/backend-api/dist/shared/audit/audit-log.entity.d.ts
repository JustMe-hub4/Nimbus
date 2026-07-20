import { BaseOrmEntity } from '../infrastructure/base.orm.entity';
export declare class AuditLogOrmEntity extends BaseOrmEntity {
    id: string;
    aggregateType: string;
    aggregateId: string;
    action: string;
    oldValue: any;
    newValue: any;
    changedBy: string;
    ipAddress: string | null;
    userAgent: string | null;
}
