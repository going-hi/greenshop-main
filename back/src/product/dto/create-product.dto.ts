import { Type } from "class-transformer"
import { IsNumber, IsString, IsArray } from "class-validator"

export class CreateProductDto {
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
