import { registerAs } from "@nestjs/config";
import { MailerModuleOptions } from 'nestjs-mailer';
export default registerAs('mailer',
  (): MailerModuleOptions =>{
    console.log("Configurando sistema de envio de correos")
    return {
      config:{
        transport: {
          host:'smtp.gmail.com',
          port: 587,
          auth:{
            user: process.env.MAIL_USUARIO,
            pass: process.env.MAIL_PASS
          }
        }
      }
    }
  } 
)