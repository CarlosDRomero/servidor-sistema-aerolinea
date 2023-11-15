import { Controller, Get, Query, Body, Patch, Param, Delete } from '@nestjs/common';
import { AmadeusApiService } from './amadeus-api.service';
import { CreateAmadeusApiDto } from './dto/create-amadeus-api.dto';
import { UpdateAmadeusApiDto } from './dto/update-amadeus-api.dto';
import { SearchFlightDto } from './dto/search-flight.dto';

@Controller('amadeus-api')
export class AmadeusApiController {
  constructor(private readonly amadeusApiService: AmadeusApiService) {}

  @Get('flight-offers')
  async search(
    @Query() query: SearchFlightDto
  ){
    return await this.amadeusApiService.searchFlights(new SearchFlightDto(query));
  }
  // @Post()
  // create(@Body() createAmadeusApiDto: CreateAmadeusApiDto) {
  //   return this.amadeusApiService.create(createAmadeusApiDto);
  // }

  // @Get()
  // findAll() {
  //   return this.amadeusApiService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.amadeusApiService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAmadeusApiDto: UpdateAmadeusApiDto) {
  //   return this.amadeusApiService.update(+id, updateAmadeusApiDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.amadeusApiService.remove(+id);
  // }
}
