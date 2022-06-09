import { User } from './models/user.entity';
import { UserService } from './user.service';
import { UserCreateDto } from "./models/user-create.dto";
import { UserUpdateDto } from "./models/user-update.dto";
import { PaginatedResult } from "../common/paginated-result.interface";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    all(page?: number): Promise<PaginatedResult>;
    create(body: UserCreateDto): Promise<User>;
    getSingle(id: number): Promise<any>;
    updateUser(id: number, body: UserUpdateDto): Promise<any>;
    delete(id: number): Promise<any>;
}
