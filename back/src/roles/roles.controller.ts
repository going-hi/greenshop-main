import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesAuth } from './decorators/roles.decorator';
import { Role } from './roles.enum';
import { RolesService } from './roles.service';
import { ActionRoleDto } from './dto/action-role.dto';
import { ApiBearerAuth, ApiOperation, ApiNoContentResponse, ApiTags, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';


@ApiTags('Role')
@Controller('role')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ){}

    @HttpCode(HttpStatus.NO_CONTENT)
    @RolesAuth(Role.OWNER)
    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: 'Изменение роли пользователя, доступно только Owner'})
    @ApiBearerAuth()
    @ApiNoContentResponse({description: 'Успешно'})
    @ApiUnauthorizedResponse({description: 'Не авторизован'})
    @ApiForbiddenResponse({description: 'У вас нет прав'})
    @Post()
    setRoleUser(@Body() actionRoleDto: ActionRoleDto) {
        return this.rolesService.setRoleUser(actionRoleDto)
    }
}
