import { Injectable } from '@nestjs/common';
import {AbstractService} from "../common/abstract.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Order} from "./order.entity";
import {Repository} from "typeorm";
import {PaginatedResult} from "../common/paginated-result.interface";

@Injectable()
export class OrderService extends AbstractService{
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>
    ) {
        super(orderRepository);
    }


    async paginate (page=1, relations = []): Promise<PaginatedResult>{
        const {data, meta} = await super.paginate(page, relations)
        const take = 5;

        return {
            data:data.map((order: Order) => ({
                id: order.id,
                name: order.name,
                email: order.email,
                created_at: order.created_at,
                order_items: order.order_items,
                total: order.total
            })),
            meta
        }
    }
    async chart(){
        return this.orderRepository.query(`
        SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, sum(i.price * i.quantity) as sum
        FROM orders o
        Join order_items i on o.id = i.order_id
        GROUP BY date
        `)
    }
}
