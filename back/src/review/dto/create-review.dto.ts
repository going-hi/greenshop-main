import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from "class-validator";

export class CreateReviewDto {

    @ApiProperty()
    @IsInt()
    productId: number

    @ApiProperty({required: false})
    @IsOptional() 
    @IsNotEmpty()
    text: string

    @ApiProperty({
        minimum: 1,
        maximum: 5
    })
    @Max(5)
    @Min(1)
    rating: number
}
