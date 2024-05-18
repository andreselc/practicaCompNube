import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule} from "@nestjs/config"
import { AppService } from './app.service';
import { ApiModule } from './apiFolder/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { APP_PIPE } from '@nestjs/core';
import { Directories } from './apiFolder/api.entity';
import { Email } from './apiFolder/email.entity';
import dbConfig from '../orm.config';


@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}` 
  }),
  TypeOrmModule.forRoot(dbConfig),
    ApiModule],
    controllers: [AppController],
    providers: [AppService,
    { //Global Pipe
      provide: APP_PIPE,
      useValue: new ValidationPipe({
      whitelist:true,
      })
    }
  ],
})
export class AppModule {}
