import { UserModule } from 'src/user/user.module';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
