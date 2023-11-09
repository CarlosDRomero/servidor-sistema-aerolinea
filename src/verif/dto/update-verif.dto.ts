import { PartialType } from '@nestjs/mapped-types';
import { CreateVerifDto } from './create-verif.dto';
import { addMinutes } from 'src/utils/dateOps';

export class UpdateVerifDto extends PartialType(CreateVerifDto) {
  expiresAt?: Date;

  constructor(){
    super();
    this.expiresAt = addMinutes(new Date(), 5);
  }
}
