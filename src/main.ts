import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //permitir que se puedan ahcer peticines desde mi localhost:4200 en las corsoptions de nestjs?
  
  app.enableCors({ origin: 'http://localhost:4200' });
  app.use(cookieParser());
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false,
    cookie:{
      maxAge: 60000
    }
  }))
  await app.listen(3000);
}
bootstrap();
