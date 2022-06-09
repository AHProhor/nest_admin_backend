import { RoleService } from "./role.service";
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    all(): Promise<any[]>;
    create(name: string, ids: number[]): Promise<any>;
    getSingle(id: number): Promise<any>;
    updateRole(id: number, name: string, ids: number[]): Promise<any>;
    delete(id: number): Promise<any>;
}
