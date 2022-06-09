import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get,
    Param,
    Post, Put, Query, Req,
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
import {AuthService} from "../auth/auth.service";
import {Request} from "Express"


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService,
                private authService: AuthService
                ){}

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

    //update  user data
    @Put('info')
    async updateinfo(
        @Req() request: Request,
        @Body() body: UserUpdateDto

    ){
        const id =  await this.authService.userId(request);

        await this.userService.update(id, body)

        return this.userService.findOne({id});
    }

    @Put('password')
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ){
        if(password !== password_confirm){
            throw new BadRequestException('Password do not match');
        }
        const id =  await this.authService.userId(request);
        const hashed = await bcrypt.hash(password,12);

        await this.userService.update(id, {
            password: hashed
        })


        return this.userService.findOne({id});
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
