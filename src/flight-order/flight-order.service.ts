import { Injectable } from '@nestjs/common';
import { CreateFlightOrderDto } from './dto/create-flight-order.dto';
import { UpdateFlightOrderDto } from './dto/update-flight-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightOrder } from './entities/flight-order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FlightOrderService {
  constructor(
    @InjectRepository(FlightOrder)
    private flightsRepo: Repository<FlightOrder>,
  ){}
  async create(dto: CreateFlightOrderDto) {
    var flight = await this.flightsRepo.findOneBy({
        url: dto.url,
        id: dto.id
    })

    if (!flight){
      const newFlight = this.flightsRepo.create(dto);
      flight = await this.flightsRepo.save(newFlight);
    }

    flight.users.push(dto.user)
    return this.flightsRepo.save(flight);

  }

  findAll() {
    return `This action returns all flightOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flightOrder`;
  }

  update(id: number, updateFlightOrderDto: UpdateFlightOrderDto) {
    return `This action updates a #${id} flightOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} flightOrder`;
  }
}
