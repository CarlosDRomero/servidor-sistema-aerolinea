import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerifService } from './verif.service';
import { CreateVerifDto } from './dto/create-verif.dto';
import { UpdateVerifDto } from './dto/update-verif.dto';
import { UsersService } from 'src/users/users.service';
import { ValidateCodeDto } from './dto/validate-code.dto';

@Controller('verif')
export class VerifController {
  constructor(
    private readonly verifService: VerifService,
    private readonly usersService: UsersService
    ) {}
  @Post()
  async verify(@Body() dto: ValidateCodeDto) {
    return await this.usersService.verifyCode(dto.email, dto.code);
  }
  // @Post()
  // create(@Body() createVerifDto: CreateVerifDto) {
  //   return this.verifService.create(createVerifDto);
  // }

  // @Get()
  // findAll() {
  //   return this.verifService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.verifService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVerifDto: UpdateVerifDto) {
  //   return this.verifService.update(+id, updateVerifDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.verifService.remove(+id);
  // }
}
