export declare class Organization {
    readonly id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    createdBy: string | null;
    updatedBy: string | null;
    constructor(props: Partial<Organization>);
    updateName(name: string): void;
}
