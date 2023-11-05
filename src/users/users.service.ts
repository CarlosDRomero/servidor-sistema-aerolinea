import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword, comparePassword} from "../utils/bcrypt"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto)
    newUser.password = await hashPassword(newUser.password);
    console.log(newUser)
    return this.usersRepository.save(newUser)
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(email: string) {
    return this.usersRepository.findOne({
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
