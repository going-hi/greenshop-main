import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { REFRESH__JWT_STRATEGY } from "../auth.constants";

export const RefreshJwtGuard = () => UseGuards(AuthGuard(REFRESH__JWT_STRATEGY))