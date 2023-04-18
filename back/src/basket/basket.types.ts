import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { ProductEntity } from "src/product/entities/product.entity";

class Product extends OmitType(ProductEntity, ['category', 'reviews']){}

export class CreatedBasketDtoType  {
    @ApiProperty({type: Product})
    product: Product

    @ApiProperty()
    id: number

    @ApiProperty()
    count: number

    @ApiProperty()
    size: string
}