import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { compareHash } from 'src/utils/bcrypt';
import { TwoFactorService } from 'src/two-factor/two-factor.service';
import { CreateTwoFactorDto } from 'src/two-factor/dto/create-two-factor.dto';
import { UseCase } from 'src/two-factor/entities/verif.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private TwoFactorService: TwoFactorService,
    private jwtService: JwtService
  ){}

  async validateUser(email: string, password: string){
    const userFound = await this.usersService.findOne(email);
    
    if (userFound && await compareHash(password,userFound.password)) return userFound;

    return null;
  }

  login(user: User){
    const payload = {email:user.email, sub: user.user_id};
    // this.TwoFactorService.generate(new CreateTwoFactorDto(user,UseCase.LOGIN))
    return{
      access_token: this.jwtService.sign(payload)
    }
  }
}
