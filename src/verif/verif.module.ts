import { Module, forwardRef } from '@nestjs/common';
import { VerifService } from './verif.service';
import { VerifController } from './verif.controller';
import { EmailService } from 'src/email/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verif } from './entities/verif.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Verif]),
    forwardRef(()=>UsersModule)
  ],
  controllers: [VerifController],
  providers: [VerifService, EmailService],
  exports:[VerifService]
})
export class VerifModule {}
