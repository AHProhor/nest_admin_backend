import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import {CommonModule} from "../common/common.module";


@Module({
  imports:[
    UserModule, CommonModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}
