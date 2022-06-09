import { ProductService } from "./product.service";
import { Product_createDto } from "./models/product_create.dto";
import { Product_updateDto } from "./models/product_update.dto";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    all(page?: number): Promise<import("../common/paginated-result.interface").PaginatedResult>;
    create(body: Product_createDto): Promise<any>;
    get(id: number): Promise<any>;
    update(id: number, body: Product_updateDto): Promise<any>;
    delete(id: number): Promise<any>;
}
