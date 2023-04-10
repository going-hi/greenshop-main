import { Injectable, ForbiddenException } from '@nestjs/common';
import { ActionRoleDto } from './dto/action-role.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesService {
    constructor(
        private readonly userService: UserService
    ) {}

   async setRoleUser({role, userId}: ActionRoleDto) {
        const user = await this.userService.setRoleUser(userId, role)
        if(!user) throw new ForbiddenException()

        return
   } 
}
