import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { VerifModule } from 'src/verif/verif.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    VerifModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
