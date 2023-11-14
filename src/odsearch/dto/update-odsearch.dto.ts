import { PartialType } from '@nestjs/mapped-types';
import { CreateOdsearchDto } from './create-odsearch.dto';

export class UpdateOdsearchDto extends PartialType(CreateOdsearchDto) {}
