import { TokenEntity } from "src/auth/entities/token.entity";
import { RatingEntity } from "src/rating/entities/rating.entity";
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

    @OneToMany(() => RatingEntity, rating => rating.user, {cascade: true}) 
    ratings: RatingEntity[]
}