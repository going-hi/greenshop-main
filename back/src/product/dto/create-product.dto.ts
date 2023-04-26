import { Type } from "class-transformer"
import { IsNumber, IsString, IsArray, IsOptional, IsInt } from "class-validator"

export class CreateProductDto {

    @IsOptional() 
    @Type(() => Number)
    @IsInt()
    categoryId: number

    @IsString()
    title: string

    @IsString()
    description: string

    @Type(() => Number)
    @IsNumber()
    price: number
 
    @IsArray()
    size: string[]
}
