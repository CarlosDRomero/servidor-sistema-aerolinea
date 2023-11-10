import { Controller, Get, Post, Body, Session, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpStatus } from '@nestjs/common/enums';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async create(@Body() dto: CreateUserDto, @Res({passthrough:true}) res: Response) {
    // await this.usersService.createTemp(dto);

  }
  //when my angular site changes its direction the session seems to reset?
  @Post('verification')
  async verify(@Body() dto:{code:string}, @Req() req: Record<string, any>) {
    console.log(req.session.id)
    await this.usersService.verifyRegisterCode(dto.code,req.session);
    return req.session;
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
