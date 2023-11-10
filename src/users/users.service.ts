import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from "../utils/bcrypt"
import { HttpException } from '@nestjs/common/exceptions';
import { UseCase } from 'src/two-factor/entities/verif.entity';
import { TwoFactorService } from 'src/two-factor/two-factor.service';
import { CryptUtil } from 'src/utils/crypt.util'

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
    dto.password = await hashPassword(dto.password);
    const code = await this.twoFactorService.generate(dto.email);
    const cryptUtil = await CryptUtil.getInstance();
    console.log({...dto,code})
    return {
      
      userToken: await cryptUtil.encrypt(JSON.stringify({...dto,code}))
    }
  }
  async verifyRegisterCode(userToken: string){
    const cryptUtil = await CryptUtil.getInstance();
    try{
      const decyprted = await cryptUtil.decrypt(userToken)
      const parsedToken = JSON.parse(decyprted)
      console.log(parsedToken)
      // Catch the error where a string is not valid to parse to json?
    }catch(e){
      
    }
    // console.log("codigo: "+code)    
    // if (sendedCode!==code){
    //   return new HttpException("Codigo incorrecto", 401);
    // }
    // console.log("Codigo correcto")
    // await this.create(dto)


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
