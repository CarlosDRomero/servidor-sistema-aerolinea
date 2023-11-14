import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";

export const DuplicatedEmailException = ()=>{
  return new HttpException(
    `Esta dirección de correo ya se encuentra registrada`,
    HttpStatus.CONFLICT,
  );
}

export const CreationError = ()=>{
  return new HttpException(
    'No se pudo crear el usuario',
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
}