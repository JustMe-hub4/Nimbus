export declare class Permission {
    readonly id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    constructor(props: Partial<Permission>);
}
