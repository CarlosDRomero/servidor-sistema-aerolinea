import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlightOrderService } from './flight-order.service';
import { CreateFlightOrderDto } from './dto/create-flight-order.dto';
import { UpdateFlightOrderDto } from './dto/update-flight-order.dto';

@Controller('flight-order')
export class FlightOrderController {
  constructor(private readonly flightOrderService: FlightOrderService) {}

  @Post('book')
  create(@Body() dto: CreateFlightOrderDto) {
    return this.flightOrderService.create(dto);
  }

  // @Get()
  // findAll() {
  //   return this.flightOrderService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.flightOrderService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFlightOrderDto: UpdateFlightOrderDto) {
  //   return this.flightOrderService.update(+id, updateFlightOrderDto);
  // }

  @Delete('cancel')
  remove(@Param('uuid') uuid: string) {
    return this.flightOrderService.remove(+uuid);
  }
}
