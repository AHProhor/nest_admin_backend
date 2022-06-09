import {IsNotEmpty} from "class-validator";

export class Product_createDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    price: number;

}