import { Controller, Request, Post, UseGuards, Get,Headers } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/auth-jwt.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {

    console.log(req.user)
    return this.authService.login(req.user);
  }
  @Post('verification')
  async verif(@Headers() header: {usertoken:string},@Request() req) {
    return this.authService.verifyCode(req.code, header.usertoken);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  isLogedIn(){
    return "el usuario si tiene permisos para entrar a estar ruta"
  }
}
