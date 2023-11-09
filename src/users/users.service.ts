import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from "../utils/bcrypt"
import { VerifService } from 'src/verif/verif.service';
import { CreateVerifDto } from 'src/verif/dto/create-verif.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { UseCase } from 'src/verif/entities/verif.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private verifService: VerifService
  ){}

  async create(dto: CreateUserDto) {
    const exists = await this.findOne(dto.email);
    if (exists) return new HttpException(
      `Esta dirección de correo ya se encuentra registrada`,
      409,
    );

    const newUser = this.usersRepo.create(dto)
    newUser.password = await hashPassword(newUser.password);
    console.log(newUser)
    const savedUser = await this.usersRepo.save(newUser)

    this.verifService.generate(new CreateVerifDto(savedUser, UseCase.SIGNUP));

    return {email:savedUser.email};
  }

  async verifyCode(email: string, code: string){
    const user = await this.findOne(email);
    if (!user){
      return new HttpException(
        `Error de verificación del usuario`,
        401,
      );
    }
    const verified = await this.verifService.verifyCode({
      user: user,
      code: code
    });
    if(!verified) return new HttpException('Código incorrecto', 403);
    return {
      email: user.email
    }
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
