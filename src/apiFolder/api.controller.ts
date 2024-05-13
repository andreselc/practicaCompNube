import { Body, 
  Controller, 
  Post, 
  Get, 
  Patch, 
  Param, 
  Query, 
  Delete,
  Put, 
} from '@nestjs/common';
import { ApiService } from './api.service';
import { creacionObjetoDto } from './dtos/creacionObjeto.dto';

@Controller() //Recuerda que este es como un prefijo para nuestras rutas
export class ApiController {

  constructor (private apiService: ApiService){}

 @Get("/status")
 getStatus(){
   return "pong"
 }

 @Get("/directories")
 getDirectories(){
  return this.apiService.findAll();
 }

 @Post("/directories")
 async postDirectories(@Body() directory: creacionObjetoDto ){
  const { name, emails } = directory;
  return await this.apiService.create(name, emails);
 }

 @Get("/directories/:id")
 async getDirectoriesById(@Param("id") id: number){
  return this.apiService.findOne(id);
 }

 @Put("/directories/:id")
 updateDirectories(){

 }

 @Patch ("/directories/:id")
 updateDirectoriesPatch(){
 
 }

 @Delete("/directories/:id")
 removeDirectories(@Param("id") id: string){
  return this.apiService.deleteDirectoryById(parseInt(id));
 }

}