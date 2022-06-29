import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import Species from "../entity/Species"

export default class ZookeeperController {
  private _repo: Repository<Species>

  constructor() {
    this._repo = AppDataSource.getRepository(Species)
  }

  async save(zookeeper: Species) {
    const savedZookeeper = await this._repo.save(zookeeper)
    return savedZookeeper
  }

  async findAll() {
    const zookeeper = await this._repo.find()
    return zookeeper
  }
  async findById(id: number) {
    const zookeeper = await this._repo.findOneBy({ id })
    return zookeeper
  }
}