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

    async setRoleUser(id: number, role: Role) {
        const user = await this.userRepository.findOneBy({id})
        if(user.role === Role.OWNER) return
        
        return await this.userRepository.save({...user, role})
    }
}
