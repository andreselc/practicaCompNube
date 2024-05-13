// email.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Directories } from './api.entity';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emails: string;

  @ManyToOne(() => Directories, directory => directory.emails)
  directory: Directories;
}