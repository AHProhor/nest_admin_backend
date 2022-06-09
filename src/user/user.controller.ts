import {
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get,
    Param,
    Post, Put, Query,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import {UserCreateDto} from "./models/user-create.dto";
import {AuthGuard} from "../auth/auth.guard";
import {UserUpdateDto} from "./models/user-update.dto";
import {query} from "express";
import {PaginatedResult} from "../common/paginated-result.interface";



@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    //Get all users
    @Get()
    async all(@Query('page') page = 1){
        return this.userService.paginate(page, ['role']);
    }

    //create user
    @Post()
    async create(@Body() body: UserCreateDto): Promise<User>{
        const password = await bcrypt.hash('1234',12);

        const {role_id,...data} = body;

        return this.userService.create({
            ...data,
            password,
            role: {id: role_id}
        });
    }

    //get single user
    @Get(':id')
    async getSingle(@Param('id') id:number){
        return this.userService.findOne({id}, ['role']);
    }

    //update user
    @Put(':id')
    async updateUser(
        @Param('id') id:number,
        @Body() body: UserUpdateDto
    ){
        const {role_id, ...data} = body;

        await this.userService.update(id, {
            ...data,

            role: {id: role_id}
        })

        return this.userService.findOne({id});
    }

    //delete user
    @Delete(':id')
    async delete(@Param('id') id:number){
        return this.userService.delete(id)
    }
}
