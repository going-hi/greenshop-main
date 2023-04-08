import { UseGuards, SetMetadata, applyDecorators} from "@nestjs/common";
import { Role } from "src/roles/roles.enum";
import { AccessJwtGuard } from "../../auth/decorators/access-jwt.decorator";
import { RolesGuard } from "../guards/roles.guard";

export const ROLES_KEY = 'roles'

export const RolesAuth = (...roles: Role[]) => {
    return applyDecorators(
        AccessJwtGuard(),
        SetMetadata(ROLES_KEY, roles),
        UseGuards(RolesGuard),
    )
}