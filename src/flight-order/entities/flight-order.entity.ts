import { Min } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('flight_order')
export class FlightOrder {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column()
  id: number;

  @Column({length:2000})
  url: string;

  @Column({length:3})
  origin: string
  @Column({length:3})
  destination: string

  @Column()
  price:number

  @Column({length:3})
  currencyCode: string

  @Column()
  @Min(1)
  adults: number
  @Column({default:0})
  children: number
  @Column({default:0})
  infants: number

  @Column({type:'timestamp'})
  departureDate: Date
  @Column({type:'timestamp', nullable:true})
  returnDate: Date

  @Column()
  duration: string

  @ManyToMany(type => User, user => user.flights)
  @JoinTable({
    name:'user_flight',
    joinColumn:{
      name:'flight_id'
    },
    inverseJoinColumn:{
      name: 'user_id'
    }
  })
  users:User[]

}
