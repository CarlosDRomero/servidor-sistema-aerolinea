import { Controller, Post, Body, Session } from '@nestjs/common';
import { verify } from 'crypto';

@Controller('two-factor')
export class TwoFactorController {
  @Post()
  async twoFactor(@Body() body: any, @Session() session : Record<string, any> ) {
    return session.id;
  }
}
