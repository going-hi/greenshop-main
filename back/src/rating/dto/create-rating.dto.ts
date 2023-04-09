import { IsIn, IsInt, Max, Min } from "class-validator";

export class CreateRatingDto {
    @IsInt()
    productId: number

    @Max(5)
    @Min(1)
    rating: number
}
