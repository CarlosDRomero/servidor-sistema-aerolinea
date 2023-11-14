import { Module } from '@nestjs/common';
import { OdsearchService } from './odsearch.service';
import { OdsearchController } from './odsearch.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports:[HttpModule],
  controllers: [OdsearchController],
  providers: [OdsearchService]
})
export class OdsearchModule {}
