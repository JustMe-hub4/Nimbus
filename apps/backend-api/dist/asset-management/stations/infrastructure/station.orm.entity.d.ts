import { BaseOrmEntity } from '../../../shared/infrastructure/base.orm.entity';
export declare class StationOrmEntity extends BaseOrmEntity {
    id: string;
    name: string;
    description: string | null;
    location: string | null;
    organizationId: string;
}
