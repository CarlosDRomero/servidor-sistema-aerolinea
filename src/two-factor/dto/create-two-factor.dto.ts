import { User } from "src/users/entities/user.entity";
import { addMinutes } from "src/utils/dateOps";
import { UseCase } from "../entities/verif.entity";

export class CreateTwoFactorDto {
  user: User
  createdAt?: Date
  expiresAt?: Date
  useCase: UseCase
  constructor(user: User, useCase: UseCase){
    const now = new Date();
    
    this.createdAt = now;
    this.expiresAt = addMinutes(now,5);
    this.user = user;
    this.useCase = useCase;
  }
}
