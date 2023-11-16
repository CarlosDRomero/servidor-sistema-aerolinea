import { Module } from '@nestjs/common';
import { FlightOrderService } from './flight-order.service';
import { FlightOrderController } from './flight-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightOrder } from './entities/flight-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlightOrder])],
  controllers: [FlightOrderController],
  providers: [FlightOrderService]
})
export class FlightOrderModule {}
