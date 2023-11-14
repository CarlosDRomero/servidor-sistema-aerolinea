import { PartialType } from '@nestjs/mapped-types';
import { CreateTwoFactorDto } from './create-two-factor.dto';
import { addMinutes } from 'src/utils/dateOps';
import { twoFactorConstants } from '../two-factor.constants';

export class UpdateTwoFactorDto extends PartialType(CreateTwoFactorDto) {
  readonly expiresAt?: Date;
  readonly redeemedAt: Date;
  code: string
  //constructor with optional parameter
  constructor(code: string,expiresAt: Date, redeemedAt: Date=null){
    super();
    const now= new Date();
    this.expiresAt = expiresAt;
    this.code = code;
    this.redeemedAt = redeemedAt;
  }
}
