//Decoradores
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Email } from "./email.entity";

@Entity()
export class Directories {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  name: string;

  @OneToMany(() => Email, email => email.directory)
  emails: Email[];

}