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

@Controller() //Recuerda que este es como un prefijo para nuestras rutas
export class ApiController {

 constructor (){}

 @Get("/status")
 getStatus(){
   return "pong"
 }

 @Get("/directories")
 getDirectories(){
 }

 @Post("/directories")
 postDirectories(){

 }

 @Get("/directories/:id")
 async getDirectoriesById(){

 }

 @Put("/directories/:id")
 findAllUsers(){

 }

 @Delete("/directories/:id")
 removeUser(){
 
 }

 @Patch ("/directories/:id")
 updateUser(){
 
 }

}