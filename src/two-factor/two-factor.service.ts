import { Injectable } from '@nestjs/common';
import { CreateTwoFactorDto } from './dto/create-two-factor.dto';
import { UpdateTwoFactorDto } from './dto/update-two-factor.dto';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { otp } from './entities/verif.entity';
import { Repository } from 'typeorm';
import { UserTwoFactorPayload } from 'src/payloads/user-verif.payload';
import { generateOTP } from 'src/utils/generateOTP';

@Injectable()
export class TwoFactorService {
  constructor(
    @InjectRepository(otp)
    private TwoFactorRepo: Repository<otp>,
    private emailService: EmailService,
  ) {}
  async generate(session: Record<string,any>) {
    session.code = generateOTP(6);
    this.emailService.sendMail(session.user.email, session.code)
  }
  async verifyCode(codigo: string, session: Record<string,any>){    
        
  }
  // findAll() 
  async findOne(dto: CreateTwoFactorDto, includeUser?: boolean){
    return await this.TwoFactorRepo.findOne({
      where:{
        user_id: dto.user.user_id,
      },
      relations:{
        user:includeUser
      }
    })
  }

  // update(id: number, UpdateTwoFactorDto: UpdateTwoFactorDto)
  // remove(id: number)
}
