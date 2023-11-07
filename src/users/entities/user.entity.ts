import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:'UsersLogin'})
export class User {
  @PrimaryGeneratedColumn()
  user_id: number

  @Column({default: ()=>'CURRENT_TIMESTAMP'})
  createdAt: Date

  @Column()
  name: string
  @Column({unique: true})
  email: string
  @Column()
  password: string
  
}