import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpStatus } from '@nestjs/common/enums';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.createTemp(dto);
  }
  @Post('verification')
  //nestjs get headers

  async verify(@Headers() header: {usertoken:string}, @Body() dto:{code:string}) {
    return await this.usersService.verifyRegisterCode(header.usertoken)
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
