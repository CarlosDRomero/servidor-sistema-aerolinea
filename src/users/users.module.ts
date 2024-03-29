import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { TwoFactorModule } from 'src/two-factor/two-factor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TwoFactorModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
