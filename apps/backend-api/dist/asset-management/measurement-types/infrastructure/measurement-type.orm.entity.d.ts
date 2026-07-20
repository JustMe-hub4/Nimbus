import { BaseOrmEntity } from '../../../shared/infrastructure/base.orm.entity';
export declare class MeasurementTypeOrmEntity extends BaseOrmEntity {
    id: string;
    name: string;
    unit: string;
    minValue: number | null;
    maxValue: number | null;
    description: string | null;
}
