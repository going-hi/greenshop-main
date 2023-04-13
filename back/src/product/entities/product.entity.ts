import { BasketEntity } from "src/basket/entities/basket.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { ReviewEntity } from "src/review/entities/review.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity('product')
export class ProductEntity extends BaseEntity {
    @Column()
    title: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    photo: string

    @Column('simple-array') 
    size: string[]

    @OneToMany(() => ReviewEntity, review => review.product, {cascade: true})
    reviews: ReviewEntity[]

    @ManyToOne(() => CategoryEntity, category => category.products, {nullable: true})
    category: CategoryEntity

    @OneToMany(() => BasketEntity, basket => basket.product, {cascade: true})
    baskets: BasketEntity[]
}
