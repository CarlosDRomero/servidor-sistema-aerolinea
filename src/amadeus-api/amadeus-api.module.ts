import { Module } from '@nestjs/common';
import { AmadeusApiService } from './amadeus-api.service';
import { AmadeusApiController } from './amadeus-api.controller';
import { HttpModule } from '@nestjs/axios';
import { OdsearchModule } from 'src/odsearch/odsearch.module';

@Module({
  imports:[
    HttpModule,
    OdsearchModule
  ],
  controllers: [AmadeusApiController],
  providers: [AmadeusApiService],
  exports: [AmadeusApiService]
})
export class AmadeusApiModule {}
