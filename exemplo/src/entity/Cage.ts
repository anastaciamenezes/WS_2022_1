import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import Zookeeper from './Zookeeper'

@Entity()
export default class Cage {
  @PrimaryGeneratedColumn()
  code: string

  @Column()
  area: string

  @ManyToMany(() => Zookeeper, { cascade: true })
  @JoinTable()
  zookeepers: Promise<Zookeeper[]>
}