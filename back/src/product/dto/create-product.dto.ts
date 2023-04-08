import { IsNumber, IsString, IsArray } from "class-validator"

export class CreateProductDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsNumber()
    price: number
 
    @IsArray()
    size: string[]
}
