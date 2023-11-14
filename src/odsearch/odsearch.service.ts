import { Injectable } from '@nestjs/common';
import { CreateOdsearchDto } from './dto/create-odsearch.dto';
import { UpdateOdsearchDto } from './dto/update-odsearch.dto';
import { HttpService } from '@nestjs/axios';
import { ODSearchSources } from './odsearch.constants';
import { map } from 'rxjs';

@Injectable()
export class OdsearchService {


  constructor(
    private readonly http: HttpService,
  ){


  }
  create(createOdsearchDto: CreateOdsearchDto) {
    return 'This action adds a new odsearch';
  }

  findAll(city: string) {
    return this.http.get(ODSearchSources.SearchCity,{
      params:{
        where:`"${city}"`
      }
    }).pipe(map((res) => {
      console.log(res.data)
      return res.data;
    }))
  }

  findOne(id: number) {
    return `This action returns a #${id} odsearch`;
  }

  update(id: number, updateOdsearchDto: UpdateOdsearchDto) {
    return `This action updates a #${id} odsearch`;
  }

  remove(id: number) {
    return `This action removes a #${id} odsearch`;
  }
}
