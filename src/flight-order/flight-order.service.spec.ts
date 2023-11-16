import { Test, TestingModule } from '@nestjs/testing';
import { FlightOrderService } from './flight-order.service';

describe('FlightOrderService', () => {
  let service: FlightOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightOrderService],
    }).compile();

    service = module.get<FlightOrderService>(FlightOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
