import { Injectable } from '@nestjs/common';
import { CreateAmadeusApiDto } from './dto/create-amadeus-api.dto';
import { UpdateAmadeusApiDto } from './dto/update-amadeus-api.dto';
import { AmadeusApiToken } from './entities/amadeus-api.entity';
import { lastValueFrom, map,catchError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SearchFlightDto } from './dto/search-flight.dto';
import { urls } from './amadeus-api.url';
@Injectable()
export class AmadeusApiService {
  constructor(private http: HttpService){
    this.genNewAuthToken()
  }


  handleExpiredToken = async (error) =>{
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
        var res;
        this.http.get(urls.searchFlights,{
            params,
            headers:{
                'Authorization':this.token.toString()
            }
        }).pipe(map((res)=>{
            console.log(res)
        }),
            catchError(this.handleExpiredToken)
        ).subscribe(async (res)=>{
            
            if (this.token.expired) {
                console.log("Reattemping")
                this.token.expired=false
                res = await this.searchFlights(params);
            }    
        })
        return res.then(
            console.log("a")
        );
        

        // return response
    }
}
