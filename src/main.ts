import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //permitir que se puedan ahcer peticines desde mi localhost:4200 en las corsoptions de nestjs?
  
  app.enableCors({ origin: ['http://localhost:4200'] });
  await app.listen(3000);
}
bootstrap();
