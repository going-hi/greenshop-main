import { IsNumber, IsString, IsArray } from "class-validator"

export class CreateProductDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsNumber()
    price: number
 
    @IsArray()
    size: string[]
}
