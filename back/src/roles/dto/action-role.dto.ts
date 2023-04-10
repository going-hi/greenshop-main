import { IsEnum, IsInt, NotEquals } from "class-validator";
import { Role } from "../roles.enum";

export class ActionRoleDto {
    
    @IsEnum(Role)
    @NotEquals(Role.OWNER)
    role: Role

    @IsInt()
    userId: number
}