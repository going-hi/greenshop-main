import { ProductEntity } from "src/product/entities/product.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('category')
export class CategoryEntity extends BaseEntity {
    @Column({unique: true})
    name: string

    @OneToMany(() => ProductEntity, product => product.category)
    products: ProductEntity[]
}
