import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import Species from "../entity/Species"

export default class CagesController {
  private _repo: Repository<Species>

  constructor() {
    this._repo = AppDataSource.getRepository(Species)
  }

  async save(cages: Species) {
    const savedCages = await this._repo.save(cages)
    return savedCages
  }

  async findAll() {
    const cages = await this._repo.find()
    return cages
  }
  async findById(id: number) {
    const cages = await this._repo.findOneBy({ id })
    return cages
  }
}