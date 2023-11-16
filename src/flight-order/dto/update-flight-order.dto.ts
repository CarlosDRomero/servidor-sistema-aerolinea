import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightOrderDto } from './create-flight-order.dto';

export class UpdateFlightOrderDto extends PartialType(CreateFlightOrderDto) {}
