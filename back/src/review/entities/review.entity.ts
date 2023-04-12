import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { IsInt, Min, Max } from "class-validator";
import { ProductEntity } from "src/product/entities/product.entity";
import { BaseEntity } from "src/utils/base.entity";

@Entity('review')
export class ReviewEntity extends BaseEntity {
    @Column()
    @IsInt()
    @Min(0)
    @Max(5)
    rating: number

    @Column({nullable: true})
    text: string

    @ManyToOne(() => UserEntity, user => user.reviews, {onDelete: 'CASCADE'})
    user: UserEntity

    @ManyToOne(() => ProductEntity, product => product.reviews, {onDelete: 'CASCADE'})
    product: ProductEntity
}
