import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Role} from "./role.entity";
import {AbstractService} from "../common/abstract.service";
import {Request} from "express";


@Injectable()
export class RoleService extends AbstractService{
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ) {
        super(roleRepository)
    }


}
;

