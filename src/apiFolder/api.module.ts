import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { Directories } from './api.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Directories])],
  controllers: [ApiController],
  providers: [
    ApiService, 
  ],
})

export class ApiModule {
  configure(){
  }
}
