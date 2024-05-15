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

async findAll(): Promise<any[]> {
  const directories = await this.repoDir
    .createQueryBuilder('directory')
    .leftJoinAndSelect('directory.emails', 'email')
    .select(['directory.id', 'directory.name', 'string_agg(email.emails, \',\') AS emails'])
    .groupBy('directory.id')
    .addGroupBy('directory.name')
    .getRawMany();

  return directories.map(dir => ({
    name: dir.directory_name,
    emails: dir.emails.split(',')
  }));
}

  async updatePatch(id: number, partialDirectoryData: Partial<Directories>) : Promise<Directories>{

  const directory = await this.repoDir.findOneBy({ id });
  if (!directory) {
    throw new NotFoundException('Directorio no encontrado');
  }

  Object.assign(directory, partialDirectoryData);

  return await this.repoDir.save(directory);
 
  }

  async updatePut(id: number, updatedDirectoryData: Directories): Promise<Directories> {
    const directory = await this.repoDir
        .createQueryBuilder('directory')
        .leftJoinAndSelect('directory.emails', 'emails')
        .where('directory.id = :id', { id })
        .getOne();

    if (!directory) {
        throw new NotFoundException('Directorio no encontrado');
    }

    // Actualiza el nombre del directorio
    directory.name = updatedDirectoryData.name;

    // Actualiza los correos electrónicos asociados al directorio
    if (updatedDirectoryData.emails) {
        directory.emails = updatedDirectoryData.emails.map((email) => {
            const existingEmail = directory.emails.find((existingEmail) => existingEmail.id === email.id);
            if (existingEmail) {
                // Si el correo ya existe en el directorio, actualiza su contenido
                existingEmail.emails = email.emails;
                return existingEmail;
            } else {
                // Si el correo no existe en el directorio, créalo
                return this.repoEm.create({
                    emails: email.emails,
                    directory: directory
                });
            }
        });
    }

    return await this.repoDir.save(directory);
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