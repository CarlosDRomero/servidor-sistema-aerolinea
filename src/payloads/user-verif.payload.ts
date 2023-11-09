import { User } from "src/users/entities/user.entity";

export interface UserVerifPayload{
  user:User
  code: string
}