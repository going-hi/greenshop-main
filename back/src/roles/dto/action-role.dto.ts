import { IsEnum, IsInt, NotEquals } from "class-validator";
import { Role } from "../roles.enum";
import { ApiProperty } from "@nestjs/swagger";

export class ActionRoleDto {
    @ApiProperty({enum: [Role.ADMIN, Role.USER]})
    @IsEnum(Role)
    @NotEquals(Role.OWNER)
    role: Role

    @ApiProperty()
    @IsInt()
    userId: number
}