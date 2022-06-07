import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {RoleService} from "./role.service";
import {UserUpdateDto} from "../user/models/user-update.dto";

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) {
    }

    //Get all role
    @Get()
    async all (){
        return this.roleService.all()
    }

    //Create Role
    @Post()
    async create(
        @Body('name') name:string,
        @Body('permissions') ids: number[]
    ){
        /*
        * [1,2]
        *
        * [
        * {id,1}{id,2}
        * ]
        * */
        return this.roleService.create({
            name,
            permissions: ids.map(id => ({id}))
        })
    }


    //get single Role
    @Get(':id')
    async getSingle(@Param('id') id:number){
        return this.roleService.findOne({id});
    }

    //update Role
    @Put(':id')
    async updateRole(
        @Param('id') id:number,
        @Body('name') name:string,
        @Body('permissions') ids: number[]
    ){
        await this.roleService.update(id, {
            name,
            permissions: ids.map(id => ({id}))
        })

        return this.roleService.findOne({id});
    }

    //delete Role
    @Delete(':id')
    async delete(@Param('id') id:number){
        return this.roleService.delete(id)
    }
}
