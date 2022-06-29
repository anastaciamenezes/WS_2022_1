import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Species{ 
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  scientificName: string

  @Column()
  commonName: string

  @Column()
  order: string

  @Column()
  family: string  

  @Column()
  habitat: string
}