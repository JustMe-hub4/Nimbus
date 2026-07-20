import { MeasurementType } from '../domain/measurement-type.entity';
export declare class MeasurementTypeResponseDto {
    id: string;
    name: string;
    unit: string;
    minValue: number | null;
    maxValue: number | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    static fromDomain(type: MeasurementType): MeasurementTypeResponseDto;
}
