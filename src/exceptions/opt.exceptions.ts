import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";

export const InvalidCodeException = ()=>{
  return new HttpException('Codigo incorrecto',HttpStatus.BAD_REQUEST)
}

export const CantsLoginException = ()=>{
  return new HttpException("No se puede realizar el login",HttpStatus.FORBIDDEN);
}