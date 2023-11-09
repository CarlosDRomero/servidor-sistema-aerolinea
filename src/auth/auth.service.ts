import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { comparePassword } from 'src/utils/bcrypt';
import { VerifService } from 'src/verif/verif.service';
import { CreateVerifDto } from 'src/verif/dto/create-verif.dto';
import { UseCase } from 'src/verif/entities/verif.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private verifService: VerifService,
    private jwtService: JwtService
  ){}

  async validateUser(email: string, password: string){
    const userFound = await this.usersService.findOne(email);
    console.log(`Validando ${userFound}`)
    if (userFound && await comparePassword(password,userFound.password)) return userFound;

    return null;
  }

  login(user: User){
    const payload = {email:user.email, sub: user.user_id};
    this.verifService.generate(new CreateVerifDto(user,UseCase.LOGIN))
    return{
      access_token: this.jwtService.sign(payload)
    }
  }
}
