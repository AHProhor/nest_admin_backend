import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {RoleService} from "./role.service";
import {UserUpdateDto} from "../user/models/user-update.dto";
import {HasPermission} from "../permission/has-permission.decorator";

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) {
    }

    //Get all role
    @Get()
    @HasPermission('roles')
    async all (){
        return this.roleService.all()
    }

    //Create Role
    @Post()
    @HasPermission('roles')
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
    @HasPermission('roles')
    async getSingle(@Param('id') id:number){
        return this.roleService.findOne({id}, ['permissions']);
    }

    //update Role
    @Put(':id')
    async updateRole(
        @Param('id') id:number,
        @Body('name') name:string,
        @Body('permissions') ids: number[]
    ){
        await this.roleService.update(id, {name});

        const role = await  this.roleService.findOne({id});

        return this.roleService.create({
            ...role,
            permissions: ids.map(id => ({id}))
        })
    }

    //delete Role
    @Delete(':id')
    @HasPermission('roles')
    async delete(@Param('id') id:number){
        return this.roleService.delete(id)
    }
}
