import { RolesModule } from './roles/roles.module';
import { RolesController } from './roles/roles.controller';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmOptions } from './config/typeorm.options';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RolesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmOptions,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [RolesController],
  providers: [],
})
export class AppModule {}
