import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBasketDto {
    @IsOptional()
    @IsNumber()
    count?: number

    @IsOptional()
    @IsString()
    size?: string

    @IsNumber()
    productId: number
}
