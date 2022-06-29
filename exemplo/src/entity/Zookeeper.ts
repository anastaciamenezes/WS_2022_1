import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import Cage from './Cage'

@Entity()
export default class Zookeeper {
  @PrimaryGeneratedColumn()
  registrationCode: string

  @Column()
  name: string

  @Column()
  birthday: Date

  @ManyToMany(() => Cage, { cascade: true })
  cages: Promise<Cage[]>
}