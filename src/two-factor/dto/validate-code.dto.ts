import { IsNotEmpty,IsEmail} from 'class-validator';

export class ValidateCodeDto{
  @IsEmail()
  email: string
  @IsNotEmpty()
  code: string
}