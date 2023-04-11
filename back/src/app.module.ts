import { FileModule } from './file/file.module';
import { RolesModule } from './roles/roles.module';
import { RolesController } from './roles/roles.controller';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmOptions } from './config/typeorm.options';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    FileModule,
    RolesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmOptions,
    }),
    AuthModule,
    UserModule,
    ProductModule,
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
