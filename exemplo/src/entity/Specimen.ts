import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import Cage from "./Cage"
import Species from "./Species";

@Entity()
export default class Specimen {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  serialNumber: string  

  @Column({ nullable: true })
  nickName: string

  @ManyToOne(() => Species)
  species: Species

  @ManyToOne(() => Cage)
  cage: Cage
  zookeeper: any;
}