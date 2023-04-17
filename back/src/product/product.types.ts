import { ApiProperty, OmitType } from "@nestjs/swagger";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";

export class CreatedProduct extends OmitType(ProductEntity, ['reviews'] as const){}

export class FileUpload extends CreateProductDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    photo: any;
}

export class ProductWithCategory extends OmitType(ProductEntity, ['reviews'] as const){}