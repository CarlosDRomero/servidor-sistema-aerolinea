import { Injectable } from '@nestjs/common';
import { CreateVerifDto } from './dto/create-verif.dto';
import { UpdateVerifDto } from './dto/update-verif.dto';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UseCase, Verif } from './entities/verif.entity';
import { Repository } from 'typeorm';
import { UserVerifPayload } from 'src/payloads/user-verif.payload';

@Injectable()
export class VerifService {
  constructor(
    @InjectRepository(Verif)
    private verifRepo: Repository<Verif>,
    private emailService: EmailService,
  ) {}
  async generate(dto: CreateVerifDto) {

    var r: Verif = await this.findOne(dto)
    if (r){
      const update = await this.verifRepo.update(dto.user.user_id,new UpdateVerifDto());   
      r = await this.findOne(dto)
    }else{
      const newOtp = this.verifRepo.create(dto)
      r = await this.verifRepo.save(newOtp);
    }
    const email = dto.user.email;
    this.emailService.sendMail(email, r.code)
  }
  async verifyCode(payload: UserVerifPayload){
    var useCase = payload.user.verified? UseCase.LOGIN : UseCase.SIGNUP;
    const validated = await this.verifRepo.findOne({
      where: {
        user: payload.user,
        code: payload.code,
        useCase: useCase
      }
    })
    return !!validated ? true : false;
  }
  // findAll() 
  async findOne(dto: CreateVerifDto){
    return await this.verifRepo.findOne({
      where:{
        user: dto.user,
        useCase: dto.useCase
      }
    })
  }

  // update(id: number, updateVerifDto: UpdateVerifDto)
  // remove(id: number)
}
