import { Module } from '@nestjs/common';
import { AmadeusApiService } from './amadeus-api.service';
import { AmadeusApiController } from './amadeus-api.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports:[
    HttpModule
  ],
  controllers: [AmadeusApiController],
  providers: [AmadeusApiService],
  exports: [AmadeusApiService]
})
export class AmadeusApiModule {}
