import {forwardRef, Module} from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Permission} from "./permission.entity";
import {CommonModule} from "../common/common.module";
import {UserModule} from "../user/user.module";
import {RoleModule} from "../role/role.module";


@Module({
  imports:[
      TypeOrmModule.forFeature([Permission]),
      CommonModule,

  ],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}

