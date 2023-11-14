import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compareHash, toHash } from "../utils/bcrypt"
import { TwoFactorService } from 'src/two-factor/two-factor.service';
import { CryptUtil } from 'src/utils/crypt.util'
import { addMinutes, isExpired } from 'src/utils/dateOps';
import { twoFactorConstants } from 'src/two-factor/two-factor.constants';
import { CreationError, DuplicatedEmailException } from 'src/exceptions/users.exceptions';
import { InvalidCodeException } from 'src/exceptions/opt.exceptions';

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
    if (exists) return DuplicatedEmailException()

    const newUser = this.usersRepo.create(dto)
    console.log(newUser)
    const savedUser = await this.usersRepo.save(newUser)
    return savedUser;
  }

  async createTemp(dto: CreateUserDto){
    const exists = await this.findOne(dto.email);
    if (exists) return DuplicatedEmailException()

    dto.password = await toHash(dto.password);
    var code = await this.twoFactorService.generate(dto.email);
    code = await toHash(code);
    const cryptUtil = await CryptUtil.getInstance();
    const expires = addMinutes(new Date(),twoFactorConstants.expiresTime)
    return {
      userToken: await cryptUtil.encryptJson({...dto,code, expires})
    }
  }
  async verifyRegisterCode(userToken: string, sendedCode: string){
    const cryptUtil = await CryptUtil.getInstance();
    const parsedToken = await cryptUtil.decryptJson(userToken)
    if (parsedToken){
      const code = parsedToken.code
      let dto = { ...parsedToken };
      delete dto.code;
      console.log(compareHash(sendedCode,code))
      console.log(isExpired(dto.expires))      
      if (await compareHash(sendedCode,code) && isExpired(dto.expires)) return InvalidCodeException();
      console.log("Creando usuario")
      const newUser = await this.create(dto)
      if (!newUser) return CreationError();
      return{
        message:"Success"
      }
    }
    return InvalidCodeException();
    
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
