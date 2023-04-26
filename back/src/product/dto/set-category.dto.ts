import { IsInt } from "class-validator";

export class SetCategoryDto {

    @IsInt()
    productId: number
    
    @IsInt()
    categoryId: number
}