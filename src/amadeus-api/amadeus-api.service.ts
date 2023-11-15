import { Injectable } from '@nestjs/common';
import { CreateAmadeusApiDto } from './dto/create-amadeus-api.dto';
import { UpdateAmadeusApiDto } from './dto/update-amadeus-api.dto';
import { AmadeusApiToken } from './entities/amadeus-api.entity';
import { lastValueFrom, map,catchError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SearchFlightDto } from './dto/search-flight.dto';
import { urls } from './amadeus-api.url';
import { OdsearchService } from 'src/odsearch/odsearch.service';


@Injectable()
export class AmadeusApiService {
  constructor(
    private http: HttpService,
    private odsearchService: OdsearchService
){
    this.genNewAuthToken()
  }
  

  handleExpiredToken = async (error) =>{
    if (!error.response) return;
    const errorInfo = error.response.data.errors[0];
    if (errorInfo.status===401){
        await this.genNewAuthToken();
        this.token.expired=true
        console.log('ERROR 401, token regenerado')

    }
}

    private body = {
        grant_type:'client_credentials',
        client_id:process.env.DEUS_CLIENT_ID,
        client_secret:process.env.DEUS_CLIENT_SECRET,
    }

    private token: AmadeusApiToken;

    async getAuthToken(){
        if (!this.token) await this.genNewAuthToken();
        return this.token;
    }
    async genNewAuthToken(){
        console.log("Regenerando token")
        const response = this.http.request({
            method: 'POST',
            url:'https://test.api.amadeus.com/v1/security/oauth2/token',
            data:this.body,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            } 
        }).pipe(map((res:any)=>{
            return new AmadeusApiToken(res.data.token_type, res.data.access_token);
        }))
        this.token = await lastValueFrom(response);
        return this.token;
    }
    async searchFlights(params: SearchFlightDto){
        console.log(params)
        var response = this.http.get(urls.searchFlights,{
            params,
            headers:{
                'Authorization':this.token?.toString() || ''
            }
        }).pipe(map((res)=>{
            return res.data;
        }),
            catchError(this.handleExpiredToken)
        )
        
        const prom = await lastValueFrom(response)

        if (!this.token.expired){
            const data: [] = prom.data
            const origin = await lastValueFrom(this.odsearchService.findByAirportCode(params.originLocationCode))
            const destination =await lastValueFrom(this.odsearchService.findByAirportCode(params.destinationLocationCode))
            var payload = {
                url: prom.meta.self,
                data: []
            }
            payload.data = data.map((flight:any)=>{
                const itineraries = flight.itineraries
                const segments = itineraries.length
                const currency = flight.price.currency
                const price = flight.price.total
                const flightClass = flight.travelerPricings[0].fareDetailsBySegment.cabin
                const duration:string = itineraries[0].duration
                const departureTime = itineraries[0].segments[0].departure.at.split("T")[1]
                const carrierCode = itineraries[0].segments[0].carrierCode
                const airlineName = prom.dictionaries.carriers[carrierCode]
                return {
                    id: flight.id,
                    origen: origin[0],
                    destino: destination[0],
                    moneda: currency,
                    precio: price,
                    tipo: flightClass,
                    duracion: duration,
                    fecha_ida: params.departureDate,
                    hora_salida: departureTime,
                    fecha_vuelta: params.returnDate,
                    codigo_aerolinea: carrierCode,
                    nombre_aerolinea: airlineName,
                }

            })
            console.log(payload)
            return payload;
        }
        this.token.expired=false
        return await this.searchFlights(params);
        // return response
    }
}
