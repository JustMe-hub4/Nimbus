import { Permission } from './permission.entity';
export declare class Role {
    readonly id: string;
    name: string;
    description: string | null;
    permissions: Permission[];
    createdAt: Date;
    updatedAt: Date;
    constructor(props: Partial<Role>);
}
