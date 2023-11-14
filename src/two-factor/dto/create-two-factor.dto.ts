import { User } from "src/users/entities/user.entity";
import { addMinutes } from "src/utils/dateOps";
import { twoFactorConstants } from "../two-factor.constants";

export class CreateTwoFactorDto {
  user: User
  code: string
  createdAt?: Date
  expiresAt?: Date
  constructor(user: User, code:string){
    const now = new Date();
    this.createdAt = now;
    this.expiresAt = addMinutes(now,twoFactorConstants.expiresTime);
    this.user = user;
    this.code = code;
  }
}
