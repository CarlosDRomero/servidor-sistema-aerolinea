import { User } from "src/users/entities/user.entity";

export interface UserTwoFactorPayload{
  user:User
  code: string
}