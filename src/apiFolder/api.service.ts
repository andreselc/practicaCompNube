import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Directories } from "./api.entity";
import { Email } from './email.entity';

@Injectable()
export class ApiService {

  //InjectRepository(): Le decimos al sistema de DI que necesitamos usar el reporistorio de "User".
  //DI usa esta notación (Repository<User>) para avaeriguar cuál instancia necesita "inyectar" a esta clase en tiempo de ejecución.
  //Se usa el decorador porque Repository<User> tiene un parámetro genérico
  constructor(@InjectRepository(Directories) private repoDir: Repository<Directories>,
  @InjectRepository(Email) private repoEm: Repository<Email>,){}

  async create(nameE: string, emailsE: string[]){
     // Crea un nuevo directorio
  const newDirectory = this.repoDir.create({
    name: nameE,
  });

  // Guarda el directorio en la base de datos
  const savedDirectory = await this.repoDir.save(newDirectory);

  const emails = await Promise.all(
    emailsE.map(async (emailAddress) => {
      const email = this.repoEm.create({
        emails: emailAddress,
        directory: savedDirectory,
      });
      return await this.repoEm.save(email); 
    }),
  );


  const emailAddresses = emails.map((email) => email.emails);
  return { name: savedDirectory.name, emails: emailAddresses };
  
  }

  findOne(id:number) {
    //Un criterio: return this.repo.findOneBy({ email: "asdf@asdf.com"});
    if (!id){
      return null;
    }
    return this.repoDir.findOneBy({ id });
  }

  find(){
    //Devuelve un array de muchos registros que cumplan un criterio
    //El criterio es el email.
    return this.repoDir.find({ where: {  } });
  }

  async update(id: number, attrs: Partial<Directories>){
 
  }

  async remove(id: number){

  }

}