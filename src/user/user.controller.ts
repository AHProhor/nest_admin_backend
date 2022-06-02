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



@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    //Get all users
    @Get()
    async all(@Query('page') page = 1): Promise<User[]>{
        return this.userService.paginate(page);
    }

    //create user
    @Post()
    async create(@Body() body: UserCreateDto): Promise<User>{
        const password = await bcrypt.hash('1234',12);
        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password
        });
    }

    //get single user
    @Get(':id')
    async getSingle(@Param('id') id:number){
        return this.userService.findOne({id});
    }

    //update user
    @Put(':id')
    async updateUser(
        @Param('id') id:number,
        @Body() body: UserUpdateDto
    ){
        await this.userService.update(id, body)

        return this.userService.findOne({id});
    }

    //delete user
    @Delete(':id')
    async delete(@Param('id') id:number){
        return this.userService.delete(id)
    }
}
