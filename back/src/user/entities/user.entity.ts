import { TokenEntity } from "src/auth/entities/token.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity('users')
export class UserEntity extends BaseEntity {

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @OneToOne(() => TokenEntity)
    token: TokenEntity
}