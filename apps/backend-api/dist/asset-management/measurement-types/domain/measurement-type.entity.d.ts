export declare class MeasurementType {
    readonly id: string;
    name: string;
    unit: string;
    minValue: number | null;
    maxValue: number | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    createdBy: string | null;
    updatedBy: string | null;
    deletedBy: string | null;
    constructor(props: Partial<MeasurementType>);
    updateName(name: string): void;
    updateUnit(unit: string): void;
    updateRange(min: number | null, max: number | null): void;
    updateDescription(description: string | null): void;
}
