import { Controller, Get } from '@nestjs/common';
import { RolesAuth } from './decorators/roles.decorator';
import { Role } from './roles.enum';

@Controller('role')
export class RolesController {
    
    @RolesAuth(Role.USER)
    @Get()
    test() {
        return 'you are admin'
    }
}
