import{Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ProductService} from "./product.service";
import {Product_createDto} from "./models/product_create.dto";
import {Product_updateDto} from "./models/product_update.dto";
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService ) {
    }


    @Get()
    async all(@Query('page') page=1){
         return this.productService.paginate(page);
    }

    @Post()
    async create(@Body() body: Product_createDto){
         return this.productService.create(body)
    }

    @Get(':id')
    async get(@Param('id') id:number){
        return this.productService.findOne({id})
    }

    @Put(':id')
    async update(
        @Param('id') id:number,
        @Body() body: Product_updateDto
    ){
        await this.productService.update(id, body);
        return this.productService.findOne({id});
    }

    @Delete(":id")
    async delete( @Param('id') id:number){
         return this.productService.delete(id)
    }
}
