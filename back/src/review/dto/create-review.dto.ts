import { IsInt, IsNotEmpty, IsOptional, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsInt()
    productId: number

    @IsOptional() 
    @IsNotEmpty()
    text: string

    @Max(5)
    @Min(1)
    rating: number
}
