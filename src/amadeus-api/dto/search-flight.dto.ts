import { IsBoolean, IsDate, IsNotEmpty, IsNumber, Length, MaxLength, Min, MinDate } from "class-validator";

export enum TravelClass{
  'ECONOMY',
  'PREMIUM_ECONOMY',
  'BUSINESS',
  'FIRST'
}

export class SearchFlightDto{
  @IsNotEmpty()
  @Length(3)
  originLocationCode: string
  @IsNotEmpty()
  @Length(3)
  destinationLocationCode: string

  @IsDate()
  @MinDate(new Date())
  departureDate: Date

  @IsDate()
  returnDate?: string

  @IsNumber()
  @Min(1)
  adults: number

  @IsNumber()
  @Min(0)
  children?: number

  @IsNumber()
  @Min(0)
  infants?: number

  travelClass?: TravelClass

  @IsBoolean()
  nonStop: boolean = false

  @IsNotEmpty()
  @Length(3)
  currencyCode: string = 'COP'

  @IsNumber()
  @Min(0)
  maxPrice?: number

}