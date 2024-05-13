//Decoradores
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Directories {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  name: boolean;

  @Column()
  email: string;

  
}