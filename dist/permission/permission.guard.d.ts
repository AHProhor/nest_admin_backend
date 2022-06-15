import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { RoleService } from "../role/role.service";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
export declare class PermissionGuard implements CanActivate {
    private reflector;
    private authService;
    private userService;
    private roleService;
    constructor(reflector: Reflector, authService: AuthService, userService: UserService, roleService: RoleService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
