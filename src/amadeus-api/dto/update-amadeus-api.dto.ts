import { PartialType } from '@nestjs/mapped-types';
import { CreateAmadeusApiDto } from './create-amadeus-api.dto';

export class UpdateAmadeusApiDto extends PartialType(CreateAmadeusApiDto) {}
