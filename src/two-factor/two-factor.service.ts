import { Injectable } from '@nestjs/common';
import { CreateTwoFactorDto } from './dto/create-two-factor.dto';
import { UpdateTwoFactorDto } from './dto/update-two-factor.dto';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { UserTwoFactorPayload } from 'src/payloads/user-verif.payload';
import { generateOTP } from 'src/utils/generateOTP';
import { User } from 'src/users/entities/user.entity';
import { addMinutes, isExpired } from 'src/utils/dateOps';
import { toHash } from 'src/utils/bcrypt';
import { CryptUtil } from 'src/utils/crypt.util';
import { twoFactorConstants } from './two-factor.constants';

@Injectable()
export class TwoFactorService {
  constructor(
    @InjectRepository(otp)
    private TwoFactorRepo: Repository<otp>,
    private emailService: EmailService,
  ) {}
  async codeNeeded(user: User){
    const otp = await this.findOne(user);
    if (otp) return isExpired(addMinutes(otp.redeemedAt,5))
    return isExpired(addMinutes(user.createdAt,5))
    
  }
  async redeemCode(user: User){
    const otp = await this.findOne(user);
    if (!otp || isExpired(otp.expiresAt)) return false;
    this.update(otp.id,new UpdateTwoFactorDto(null, otp.expiresAt,new Date()))
  }
  async generate(email: string) {
    const code = generateOTP(6);
    await this.sendCode(email, code);
    return code;
  }
  async sendCode(email: string, code: string){
    try{
      this.emailService.sendMail(email,code)
    }catch(e){
      console.log("Error al enviar el correo")
    }    
  }
  async create(dto: CreateTwoFactorDto) {
    const {user, code} = dto;
    dto.code = await toHash(code);
    var otp = await this.findOne(user)
    
    if (otp || isExpired(otp.expiresAt)){
      const now = new Date();
      otp = await this.update(otp.id,new UpdateTwoFactorDto(code, addMinutes(now,twoFactorConstants.expiresTime)));
    }else{
      otp = this.TwoFactorRepo.create(dto);
      otp = await this.TwoFactorRepo.save(otp);
    }
    this.sendCode(user.email,code);
    return (await CryptUtil.getInstance()).encryptJson({email:user.email})
  }
  async update(id: string, dto: UpdateTwoFactorDto){
    return await this.TwoFactorRepo.update({id},dto)[0]
  }
  // findAll() 
  async findOne(user: User){
    return await this.TwoFactorRepo.findOne({
      where:{
        user_id: user.user_id,
      }
    })
  }

  // update(id: number, UpdateTwoFactorDto: UpdateTwoFactorDto)
  // remove(id: number)
}
