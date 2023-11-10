import { Module } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { EmailService } from 'src/email/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { otp } from './entities/verif.entity';
import { TwoFactorController } from './two-factor.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([otp]),
  ],
  providers: [TwoFactorService, EmailService],
  exports:[TwoFactorService],
  controllers: [TwoFactorController]
})
export class TwoFactorModule {}
