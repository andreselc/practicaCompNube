import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule} from "@nestjs/config"
import { AppService } from './app.service';
import { ApiModule } from './apiFolder/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}` //Para Development
  }),
    ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
