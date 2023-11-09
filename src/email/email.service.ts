import { Injectable } from '@nestjs/common';
import { InjectMailer, Mailer,template } from 'nestjs-mailer';

@Injectable()
export class EmailService {
  constructor(@InjectMailer() private mailerService: Mailer){}

  sendMail(to:string, codigo: string){
    console.log("Intentando envio email a "+to)
    this.mailerService.sendMail({
      to,
      from: process.env.MAIL_USUARIO,
      subject: 'Verificación por correo',
      text: 'Este correo contiene el codigo de verificación para iniciar sesión en la pagina',
      html:template('src/email/templates/correo-verificacion.hbs' , {codigo})
    })
    
  }
}
