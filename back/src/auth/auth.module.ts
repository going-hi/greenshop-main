import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessStrategy } from './strategies/access.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { TokenEntity } from './entities/token.entity';
import { TokenService } from './token.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessStrategy, RefreshStrategy, TokenService],
  imports: [
    ConfigModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity, TokenEntity])
  ]
})
export class AuthModule {}
