import { TokenEntity } from "src/auth/entities/token.entity";
import { ReviewEntity } from "src/review/entities/review.entity";
import { Role } from "src/roles/roles.enum";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";

@Entity('users')
export class UserEntity extends BaseEntity {

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @OneToOne(() => TokenEntity)
    token: TokenEntity

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role

    @OneToMany(() => ReviewEntity, review => review.user, {cascade: true}) 
    reviews: ReviewEntity[]
}