import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { Directories } from './api.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Directories, Email])],
  controllers: [ApiController],
  providers: [
    ApiService, 
  ],
})

export class ApiModule {
  configure(){
  }
}
