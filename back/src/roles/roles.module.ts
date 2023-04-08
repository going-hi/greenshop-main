import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
