import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import databaseConfig from './config/database.config';

import { MailerModule } from 'nestjs-mailer';
import { TwoFactorModule } from './two-factor/two-factor.module';
import mailConfig from 'src/config/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig()),
    MailerModule.forRoot(mailConfig()),
    AuthModule,
    UsersModule,
    EmailModule,
    TwoFactorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
