import { User } from "src/users/entities/user.entity";
import { generateOTP } from "src/utils/generateOTP";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('otp')
export class otp {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  code: string

  @Column({default: ()=>'CURRENT_TIMESTAMP'})
  createdAt: Date

  @Column({default: ()=>'CURRENT_TIMESTAMP', onUpdate:'CURRENT_TIMESTAMP'})
  updatedAt: Date

  @Column()
  expiresAt: Date

  @Column({nullable:true})
  redeemedAt: Date

  @Column()
  user_id:string

  @OneToOne(() => User)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'user_id'}])
  user: User;

}
