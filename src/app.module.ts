import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule} from "@nestjs/config"
import { AppService } from './app.service';
import { ApiModule } from './apiFolder/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}` //Para Development
  }),
   TypeOrmModule.forRoot({
    type: 'sqlite',
    database: '',
    entities: [],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: true,
   }),
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
