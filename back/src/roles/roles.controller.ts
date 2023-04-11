import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesAuth } from './decorators/roles.decorator';
import { Role } from './roles.enum';
import { RolesService } from './roles.service';
import { ActionRoleDto } from './dto/action-role.dto';

@Controller('role')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ){}

    @HttpCode(204)
    @RolesAuth(Role.OWNER)
    @UsePipes(new ValidationPipe())
    @Post()
    setRoleUser(@Body() actionRoleDto: ActionRoleDto) {
        return this.rolesService.setRoleUser(actionRoleDto)
    }
}
