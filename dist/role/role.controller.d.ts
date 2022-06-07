import { RoleService } from "./role.service";
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    all(): Promise<import("./role.entity").Role[]>;
    create(name: string, ids: number[]): Promise<import("./role.entity").Role>;
    getSingle(id: number): Promise<import("./role.entity").Role>;
    updateRole(id: number, name: string, ids: number[]): Promise<import("./role.entity").Role>;
    delete(id: number): Promise<any>;
}