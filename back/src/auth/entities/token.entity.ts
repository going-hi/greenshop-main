import { UserEntity } from "src/user/entities/user.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('token')
export class TokenEntity extends BaseEntity {
    
    @Column({unique: true})
    refreshToken: string

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity
}