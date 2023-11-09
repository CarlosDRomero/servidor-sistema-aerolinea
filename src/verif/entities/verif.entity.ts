import { User } from "src/users/entities/user.entity";
import { generateOTP } from "src/utils/generateOTP";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UseCase{
  SIGNUP,
  LOGIN
}

@Entity('otp')
export class Verif {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column({default: generateOTP(6), onUpdate: generateOTP(6)})
  code: string

  @Column({default: ()=>'CURRENT_TIMESTAMP'})
  createdAt: Date

  @Column({default: ()=>'CURRENT_TIMESTAMP', onUpdate:'CURRENT_TIMESTAMP'})
  updatedAt: Date

  @Column('int')
  useCase: UseCase

  @Column()
  expiresAt: Date

  @OneToOne(() => User)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'user_id'}])
  user: User;

}
