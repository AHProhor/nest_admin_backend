import {forwardRef, Module} from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "./role.entity";
import {PermissionModule} from "../permission/permission.module";
import {AuthService} from "../auth/auth.service";

@Module({
  imports:[
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
