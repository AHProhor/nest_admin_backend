import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderItem} from "./Order-item.entity";
import {Order} from "./order.entity";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [
      CommonModule,
    TypeOrmModule.forFeature([Order,OrderItem] )
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
