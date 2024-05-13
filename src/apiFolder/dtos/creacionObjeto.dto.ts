import {IsEmail, IsString} from "class-validator";

export class creacionObjetoDto{
   
  @IsString()
  name: string;

  @IsEmail({}, { each: true }) 
  emails: string[]; 

}