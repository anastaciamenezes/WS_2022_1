import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import Specimen from "../entity/Specimen"

export default class SpecimenController {
  private _repo: Repository<Specimen>

  constructor() {
    this._repo = AppDataSource.getRepository(Specimen)
  }

  async save(species: Specimen) {
    const savedSpecimen = await this._repo.save(species)
    return savedSpecimen
  }

  async findAll() {
    const specimen = await this._repo.find()
    return specimen
  }
  async findById(id: number) {
    const specimen = await this._repo.findOneBy({ id })
    return specimen
  }
}