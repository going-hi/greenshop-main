import { RatingEntity } from "src/rating/entities/rating.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('product')
export class ProductEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    description: string

    @Column({type: 'money'})
    price: number

    @Column('simple-array') 
    size: string[]

    @OneToMany(() => RatingEntity, rating => rating.product)
    ratings: RatingEntity[]
}
