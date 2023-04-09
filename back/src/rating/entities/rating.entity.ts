import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { IsInt, Min, Max } from "class-validator";
import { ProductEntity } from "src/product/entities/product.entity";
import { BaseEntity } from "src/utils/base.entity";

@Entity('rating')
export class RatingEntity extends BaseEntity {
    @Column()
    @IsInt()
    @Min(0)
    @Max(5)
    rating: number

    @ManyToOne(() => UserEntity, user => user.ratings, {onDelete: 'CASCADE'})
    user: UserEntity

    @ManyToOne(() => ProductEntity, product => product.ratings, {onDelete: 'CASCADE'})
    product: ProductEntity
}
