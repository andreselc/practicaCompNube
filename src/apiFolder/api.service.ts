import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Directories } from "./api.entity";
import { Email } from './email.entity';

@Injectable()
export class ApiService {

  constructor(@InjectRepository(Directories) private repoDir: Repository<Directories>,
  @InjectRepository(Email) private repoEm: Repository<Email>,){}

  async create(nameE: string, emailsE: string[]){
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

  async findOne(id: number): Promise<Directories> {
    const directory = await this.repoDir
        .createQueryBuilder('directory')
        .leftJoinAndSelect('directory.emails', 'email')
        .select(['directory.id', 'directory.name', 'GROUP_CONCAT(email.emails) AS emails'])
        .where('directory.id = :id', { id })
        .groupBy('directory.id')
        .addGroupBy('directory.name')
        .getRawOne();

    if (directory) {
        directory.emails = directory.emails.split(',');
    }

    return directory;
}

  async findAll(): Promise<Directories[]> {
    const directories = await this.repoDir
    .createQueryBuilder('directory')
    .leftJoinAndSelect('directory.emails', 'email')
    .select(['directory.id', 'directory.name', 'GROUP_CONCAT(email.emails) AS emails'])
    .groupBy('directory.id')
    .addGroupBy('directory.name')
    .getRawMany();

    directories.forEach(directory => {
    directory.emails = directory.emails.split(',');
  });

  return directories;
  }

  async update(id: number, attrs: Partial<Directories>){
 
  }

  async deleteDirectoryById(id: number): Promise<void> {
    // Eliminar correos electrónicos asociados al directorio
    await this.repoDir
      .createQueryBuilder()
      .delete()
      .from('email')
      .where('directoryId = :id', { id })
      .execute();

    // Eliminar el directorio
    await this.repoDir.delete(id);
  }

}