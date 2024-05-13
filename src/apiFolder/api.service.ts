import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Directories } from "./api.entity";

@Injectable()
export class ApiService {

  //InjectRepository(): Le decimos al sistema de DI que necesitamos usar el reporistorio de "User".
  //DI usa esta notación (Repository<User>) para avaeriguar cuál instancia necesita "inyectar" a esta clase en tiempo de ejecución.
  //Se usa el decorador porque Repository<User> tiene un parámetro genérico
  constructor(@InjectRepository(Directories) private repo: Repository<Directories>){}

  create(email: string, password: string){
  
  }

  findOne(id:number) {
    //Un criterio: return this.repo.findOneBy({ email: "asdf@asdf.com"});
    if (!id){
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  find(){
    //Devuelve un array de muchos registros que cumplan un criterio
    //El criterio es el email.
    return this.repo.find({ where: {  } });
  }

  async update(id: number, attrs: Partial<Directories>){
 
  }

  async remove(id: number){

  }

}