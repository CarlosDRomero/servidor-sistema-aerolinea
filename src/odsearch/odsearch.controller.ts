import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OdsearchService } from './odsearch.service';
import { CreateOdsearchDto } from './dto/create-odsearch.dto';
import { UpdateOdsearchDto } from './dto/update-odsearch.dto';

@Controller('odsearch')
export class OdsearchController {
  constructor(private readonly odsearchService: OdsearchService) {}

  @Post()
  create(@Body() createOdsearchDto: CreateOdsearchDto) {
    return this.odsearchService.create(createOdsearchDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.odsearchService.findAll(req.query.city);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.odsearchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOdsearchDto: UpdateOdsearchDto) {
    return this.odsearchService.update(+id, updateOdsearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.odsearchService.remove(+id);
  }
}
