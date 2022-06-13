import { OrderService } from "./order.service";
import { Response } from "express";
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    allOrder(page?: number): Promise<import("../common/paginated-result.interface").PaginatedResult>;
    export(res: Response): Promise<Response<any, Record<string, any>>>;
    chart(): Promise<any>;
}
