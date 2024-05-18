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
import { Directories } from './api.entity';

@Controller() //Recuerda que este es como un prefijo para nuestras rutas
export class ApiController {

  constructor (private apiService: ApiService){}

 @Get("/status")
 getStatus(){
   return "pong"
 }

 @Get("/directories")
 getDirectories(@Query('page') page: number, @Query('limit') limit: number) {
    return this.apiService.findAll(page, limit);
  }

 @Post("/directories")
 async postDirectories(@Body() directory: creacionObjetoDto ){
  const { name, emails } = directory;
  return await this.apiService.create(name, emails);
 }

 @Get("/directories/:id")
 async getDirectoriesById(@Param('id') id: number) {
  return this.apiService.findOne(id);
}

 @Put("/directories/:id")
 async updateDirectories(@Param("id") id: number, @Body() updatedDirectoryData: Directories){
  return await this.apiService.updatePut(id, updatedDirectoryData);
 }

 @Patch ("/directories/:id")
 async updateDirectoriesPatch(@Param("id") id: number, @Body() partialDirectoryData: Partial<Directories>){
    return await this.apiService.updatePatch(id, partialDirectoryData);
 }

 @Delete("/directories/:id")
 removeDirectories(@Param("id") id: string){
  return this.apiService.deleteDirectoryById(parseInt(id));
 }

}