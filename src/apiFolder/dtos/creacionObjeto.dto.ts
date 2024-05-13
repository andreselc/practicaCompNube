import {IsEmail, IsString} from "class-validator";

export class creacionObjetoDto{
  @IsEmail()
  email: string;
  
  @IsString()
  name: string;
}