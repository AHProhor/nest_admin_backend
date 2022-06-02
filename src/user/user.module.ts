  import { Module  } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
  import {AuthGuard} from "@nestjs/passport";
  import {CommonModule} from "../common/common.module";

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
      CommonModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
