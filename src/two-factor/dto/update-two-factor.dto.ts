import { PartialType } from '@nestjs/mapped-types';
import { CreateTwoFactorDto } from './create-two-factor.dto';
import { addMinutes } from 'src/utils/dateOps';
import { UseCase } from '../entities/verif.entity';

export class UpdateTwoFactorDto extends PartialType(CreateTwoFactorDto) {
  expiresAt?: Date;
  useCase: UseCase
  constructor(useCase: UseCase){
    super();
    this.expiresAt = addMinutes(new Date(), 5);
    this.useCase = useCase;
  }
}
