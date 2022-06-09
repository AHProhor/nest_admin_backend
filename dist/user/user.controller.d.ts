/// <reference types="express" />
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { UserCreateDto } from "./models/user-create.dto";
import { UserUpdateDto } from "./models/user-update.dto";
import { PaginatedResult } from "../common/paginated-result.interface";
import { AuthService } from "../auth/auth.service";
import { Request } from "Express";
export declare class UserController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    all(page?: number): Promise<PaginatedResult>;
    create(body: UserCreateDto): Promise<User>;
    getSingle(id: number): Promise<any>;
    updateinfo(request: Request, body: UserUpdateDto): Promise<any>;
    updatePassword(request: Request, password: string, password_confirm: string): Promise<any>;
    updateUser(id: number, body: UserUpdateDto): Promise<any>;
    delete(id: number): Promise<any>;
}
