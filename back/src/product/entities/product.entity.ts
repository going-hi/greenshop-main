import { RatingEntity } from "src/rating/entities/rating.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('product')
export class ProductEntity extends BaseEntity {
    @Column()
    title: string

    @Column()
    description: string

    @Column()
    price: number

    @Column('simple-array') 
    size: string[]

    @OneToMany(() => RatingEntity, rating => rating.product, {cascade: true})
    ratings: RatingEntity[]
}
