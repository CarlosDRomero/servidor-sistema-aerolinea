import { FlightOrder } from "src/flight-order/entities/flight-order.entity"
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToMany } from "typeorm"

@Entity('users')
export class User {
  // @PrimaryGeneratedColumn()
  // user_id: number
  @PrimaryGeneratedColumn('uuid')
  user_id: string

  @Column({default: ()=>'CURRENT_TIMESTAMP'})
  createdAt: Date
  
  @Column()
  name: string
  @Column({unique: true})
  email: string
  @Column()
  password: string

  @ManyToMany(type=> FlightOrder, flight => flight.users)
  flights: FlightOrder[]
  
}