import { Body, Controller, Get, HttpCode, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { Response, response } from 'express';
import { REFRESH_TOKEN_COOKIE } from './auth.constants';
import { RefreshJwtGuard } from './decorators/refresh-jwt.decorator';
import { User } from './decorators/user.decorator';
import { Cookie } from './decorators/cookie.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() userDto: UserDto,
    @Res({passthrough: true}) res: Response
  ) {
    const userData = await this.authService.login(userDto)
    res.cookie(REFRESH_TOKEN_COOKIE, userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60})
    return userData
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(
    @Body() userDto: UserDto,
    @Res({passthrough: true}) res: Response
  ) {
    const userData = await this.authService.registration(userDto)
    res.cookie(REFRESH_TOKEN_COOKIE, userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 })
  }

  @RefreshJwtGuard()
  @Get('refresh')
  async refresh(
    @User('id') id: number, 
    @Cookie(REFRESH_TOKEN_COOKIE) refreshToken: string,
    @Res({passthrough: true}) res: Response
    ) {
      const tokens = await this.authService.refresh(id, refreshToken)
      res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 })
      return tokens
  }

  @Get('logout')
  logout(
    @Cookie(REFRESH_TOKEN_COOKIE) refreshToken: string,
    @Res({passthrough: true}) res: Response
  ) {
    this.authService.logout(refreshToken)
    res.clearCookie(REFRESH_TOKEN_COOKIE)
    return
  }


}
