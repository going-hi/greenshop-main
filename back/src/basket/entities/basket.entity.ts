import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('basket') 
export class BasketEntity extends BaseEntity {
    
    @ManyToOne(() => UserEntity, user => user.baskets, {onDelete: 'CASCADE'})
    user: UserEntity

    @ManyToOne(() => ProductEntity, product => product.baskets, {onDelete: 'CASCADE'})
    product: ProductEntity

    @Column({default: 1}) 
    count: number

    @Column({nullable: true})
    size: string
}
