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

  async createTemp(dto: CreateUserDto,session: Record<string,any>){
    // const user = await this.findOne(email);
    // if (!user) {
    //   throw new HttpException('Usuario no encontrado', 404);
    // }
    dto.password = await hashPassword(dto.password);
    session.user = dto;
    this.twoFactorService.generate(session)
    
    return session;
  }
  async verifyRegisterCode(codigo: string, session: Record<string,any>){
    console.log("codigo: "+session.code)    
    if (codigo!==session.code){
      return new HttpException("Codigo incorrecto", 401);
    }
    console.log("Codigo correcto")
    await this.create(session.user)

    delete session.user;
    delete session.code;
    return session.id;
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
