import { Test, TestingModule } from '@nestjs/testing';
import { FlightOrderController } from './flight-order.controller';
import { FlightOrderService } from './flight-order.service';

describe('FlightOrderController', () => {
  let controller: FlightOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightOrderController],
      providers: [FlightOrderService],
    }).compile();

    controller = module.get<FlightOrderController>(FlightOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
