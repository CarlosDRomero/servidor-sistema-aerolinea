import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { compareHash } from 'src/utils/bcrypt';
import { TwoFactorService } from 'src/two-factor/two-factor.service';
import { addMinutes, isExpired } from 'src/utils/dateOps';
import { generateOTP } from 'src/utils/generateOTP';
import { CreateTwoFactorDto } from 'src/two-factor/dto/create-two-factor.dto';
import { CryptUtil } from 'src/utils/crypt.util';
import { CantsLoginException, InvalidCodeException } from 'src/exceptions/opt.exceptions';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private twoFactorService: TwoFactorService,
    private jwtService: JwtService
  ){}

  async validateUser(email: string, password: string){
    const userFound = await this.usersService.findOne(email);
    
    if (userFound && await compareHash(password,userFound.password)) return userFound;

    return null;
  }

  async login(user: User){
    console.log(user)
    if (!(await this.twoFactorService.codeNeeded(user))){
      const payload = {email:user.email, sub: user.user_id};
      return{
        access_token: this.jwtService.sign(payload)
      }
    }
    return await this.twoFactorService.create(new CreateTwoFactorDto(user, generateOTP(6)))    
  }
  async verifyCode(code: string, userToken: string){
    const cryptUtil = await CryptUtil.getInstance()
    const parsedToken = await cryptUtil.decryptJson(userToken);
    if (parsedToken){
      const userFound = await this.usersService.findOne(parsedToken.email);
      if (!userFound) return InvalidCodeException()
      const otp = await this.twoFactorService.findOne(userFound)
      
      if (!otp || !compareHash(otp.code,code)) return InvalidCodeException()
      const redeemed = await this.twoFactorService.redeemCode(userFound);
      if (redeemed) return this.login(userFound)
      return CantsLoginException()
    }
    return InvalidCodeException()
  }
}
