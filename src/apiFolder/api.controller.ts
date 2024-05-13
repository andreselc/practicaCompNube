import { Body, 
  Controller, 
  Post, 
  Get, 
  Patch, 
  Param, 
  Query, 
  Delete, 
} from '@nestjs/common';


@Controller('api') //Recuerda que este es como un prefijo para nuestras rutas
export class ApiController {

 constructor (){}

 @Get("/whoami")
 whoAmI(){

 }

 @Post("/signout")
 signOut(){
 }

 @Post("/signup")
 async createUser(){

 }

 @Post("/signin")
 async signin(){

 }

 @Get("/:id")
 async findUser(){

 }

 @Get()
 findAllUsers(){

 }

 @Delete("/:id")
 removeUser(){
 
 }

 @Patch ("/:id")
 updateUser(){
 
 }
}