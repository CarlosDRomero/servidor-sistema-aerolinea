import { IsBoolean, IsDate, IsNotEmpty, IsNumber, Length, MaxLength, Min, MinDate } from "class-validator";

export enum TravelClass{
  'ECONOMY' = 'ECONOMY',
  'PREMIUM_ECONOMY' = 'PREMIUM_ECONOMY',
  'BUSINESS' = 'FIRST',
  'FIRST' = 'FIRST'
}

export class SearchFlightDto{
  @IsNotEmpty() @Length(3)
  originLocationCode: string
  @IsNotEmpty() @Length(3)
  destinationLocationCode: string

  @IsDate() @MinDate(new Date())
  departureDate: Date

  @IsDate()
  returnDate?: string

  @IsNumber() @Min(1)
  adults: number

  @IsNumber() @Min(0)
  children?: number

  @IsNumber() @Min(0)
  infants?: number

  travelClass?: string

  @IsBoolean()
  nonStop: boolean = false

  @IsNotEmpty() @Length(3)
  currencyCode: string = 'COP'

  @IsNumber() @Min(0)
  maxPrice?: number

  constructor(data: Partial<SearchFlightDto> = {}) {
    Object.assign(this, data)
  }

}