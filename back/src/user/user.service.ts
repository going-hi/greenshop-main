import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/roles.enum';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: {id},
        })
        return user
    }

    async setRoleUser(userId: number, role: Role) {
        await this.userRepository.update(userId, {role})
    }
}
