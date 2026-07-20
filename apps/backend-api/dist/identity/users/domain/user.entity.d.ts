export declare class User {
    readonly id: string;
    email: string;
    passwordHash: string;
    fullName: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    createdBy: string | null;
    updatedBy: string | null;
    constructor(props: Partial<User>);
    deactivate(): void;
    updateName(name: string): void;
}
