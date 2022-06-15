import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './product/product.module';
import { UploadController } from './product/upload.controller';
import { OrderModule } from './order/order.module';
import {APP_GUARD} from "@nestjs/core";
import {PermissionGuard} from "./permission/permission.guard";
import {RoleService} from "./role/role.service";
import {PermissionService} from "./permission/permission.service";


@Module({
  imports: [
    UserModule,
    AuthModule,
    CommonModule,
    RoleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root2',
      password: 'root',
      database: 'admin',
      autoLoadEntities: true,
      synchronize: true,
    }),

    PermissionModule,
    ProductModule,
    OrderModule
  ],
  providers:[
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,

    }
  ]
})
export class AppModule {}
