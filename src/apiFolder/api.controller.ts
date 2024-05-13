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



export class ApiController {

 constructor (){}

 @Get("/status")
 getStatus(){

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