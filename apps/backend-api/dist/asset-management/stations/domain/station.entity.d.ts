export declare class Station {
    readonly id: string;
    name: string;
    description: string | null;
    location: string | null;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    createdBy: string | null;
    updatedBy: string | null;
    deletedBy: string | null;
    constructor(props: Partial<Station>);
    updateName(name: string): void;
    updateDescription(description: string | null): void;
    updateLocation(location: string | null): void;
    softDelete(deletedBy: string): void;
}
