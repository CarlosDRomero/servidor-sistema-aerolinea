import { IsDate, IsNumber, IsString, IsUrl, Length, MaxLength, Min, isURL } from "class-validator"
import { User } from "src/users/entities/user.entity"
import { ManyToMany } from "typeorm"

export class CreateFlightOrderDto {
  @IsNumber()
  id: number
  @IsUrl()
  url: string

  @IsString()
  @Length(3)
  origin:string
  @IsString()
  @Length(3)
  destination:string

  price: number

  @IsString()
  @Length(3)
  currencyCode:string

  @Min(1)
  adults: number

  children: number
  infants: number

  @IsDate()
  departureDate: Date

  @IsDate()
  returnDate?: Date

  duration: string

  user:User
}
