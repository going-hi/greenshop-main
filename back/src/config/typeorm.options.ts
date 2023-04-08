import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeOrmOptions = (configService: ConfigService): TypeOrmModuleOptions  => ({
    port: Number(configService.get('DB_PORT')),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    database: configService.get('DB_NAME'),
    type: 'postgres',
    synchronize: true,
    autoLoadEntities: true,
})
 