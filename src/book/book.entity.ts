import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity({name:"book"})
    
export class BookEntity 
{
      @PrimaryGeneratedColumn()
      id: number;

      @Column()
      name: string;

      @Column()
      author: string;

      @Column()
      summary: string;

      @Column()
      location: string;

      @Column()
      isActive: boolean;

      @Column()
      isDeleted:boolean;
}