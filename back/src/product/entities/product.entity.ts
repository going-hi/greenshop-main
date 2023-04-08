import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity } from "typeorm";

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
}
