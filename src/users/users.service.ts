import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compareHash, toHash } from "../utils/bcrypt"
import { HttpException } from '@nestjs/common/exceptions';
import { TwoFactorService } from 'src/two-factor/two-factor.service';
import { CryptUtil } from 'src/utils/crypt.util'
import { addMinutes } from 'src/utils/dateOps';

//from netsjs cli i want to rename a full resource?
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private twoFactorService: TwoFactorService
  ){}

  async create(dto: CreateUserDto) {
    const exists = await this.findOne(dto.email);
    if (exists) return new HttpException(
      `Esta dirección de correo ya se encuentra registrada`,
      409,
    );

    const newUser = this.usersRepo.create(dto)
    console.log(newUser)
    const savedUser = await this.usersRepo.save(newUser)

    // this.TwoFactorService.generate(new CreateTwoFactorDto(savedUser, UseCase.SIGNUP));

    // return {email:savedUser.email};
  }

  async createTemp(dto: CreateUserDto){
    // const user = await this.findOne(email);
    // if (!user) {
    //   throw new HttpException('Usuario no encontrado', 404);
    // }
    dto.password = await toHash(dto.password);
    var code = await this.twoFactorService.generate(dto.email);
    code = await toHash(code);
    console.log({...dto,code})
    const cryptUtil = await CryptUtil.getInstance();
    return {
      
      userToken: await cryptUtil.encrypt(JSON.stringify({...dto,code, expires: addMinutes(new Date(),5)}))
    }
  }
  async verifyRegisterCode(userToken: string, sendedCode: string){
    const cryptUtil = await CryptUtil.getInstance();
    try{
      console.log("UserToken: "+userToken)
      const decyprted = await cryptUtil.decrypt(userToken)
      const parsedToken = JSON.parse(decyprted)
      const code = parsedToken.code
      //las demas variables del parsedToken que no son el codigo forman el dto del usuario
      let dto = { ...parsedToken };
      delete dto.code;
      console.log(parsedToken)      
      if (!compareHash(sendedCode,parsedToken.code)){
        return new HttpException("Codigo incorrecto", 401);
      }
      
    // console.log("Codigo correcto")
      await this.create(dto)
      // Catch the error where a string is not valid to parse to json?
    }catch(e){
      console.log("JSON no parseable")
    }
    


    return {};
  }
  findAll() {
    return this.usersRepo.find();
  }

  async findOne(email: string) {
    return this.usersRepo.findOne({
      where: {
        email,
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
