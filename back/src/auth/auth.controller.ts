import { Body, Controller, Get, HttpCode, Post, Res, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ResSuccessLogin, Tokens } from './auth.types'
import { UserDto } from './dto/user.dto';
import { Response } from 'express';
import { REFRESH_TOKEN_COOKIE } from './auth.constants';
import { RefreshJwtGuard } from './decorators/refresh-jwt.decorator';
import { User } from './decorators/user.decorator';
import { Cookie } from './decorators/cookie.decorator';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiOperation, ApiHeader, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('login')
  @ApiOperation({summary: 'Вход в аккаунт'})
  @ApiResponse({status: 200, description: 'Пользователь успешно залогинился', type: ResSuccessLogin})
  @ApiBadRequestResponse({description: 'Такой пользователь не существует или Неверный пароль'})
  async login(
    @Body() userDto: UserDto,
    @Res({passthrough: true}) res: Response
  ) {
    const userData = await this.authService.login(userDto)
    res.cookie(REFRESH_TOKEN_COOKIE, userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
    return userData
  }

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('registration')
  @ApiOperation({summary: 'Регистрация нового аккаунта'})
  @ApiOkResponse({description: 'Пользователь успешно залогинился', type: ResSuccessLogin})
  @ApiBadRequestResponse({description: 'Такой пользователь уже существует'})
  async registration(
    @Body() userDto: UserDto,
    @Res({passthrough: true}) res: Response
  ) {
    const userData = await this.authService.registration(userDto)
    res.cookie(REFRESH_TOKEN_COOKIE, userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 })
    return userData
  }

  @RefreshJwtGuard()
  @Get('refresh')
  @ApiOperation({summary: 'Обновление токенов'})
  @ApiHeader({name: REFRESH_TOKEN_COOKIE, description: 'Refresh Token, устанавливается сервером'})
  @ApiOkResponse({type: Tokens})
  @ApiUnauthorizedResponse({description: 'Не авторизован'})
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({summary: 'Выход из аккаунта'})
  logout(
    @Cookie(REFRESH_TOKEN_COOKIE) refreshToken: string,
    @Res({passthrough: true}) res: Response
  ) {
    this.authService.logout(refreshToken)
    res.clearCookie(REFRESH_TOKEN_COOKIE)
    return
  }


}
