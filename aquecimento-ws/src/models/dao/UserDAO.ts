import User from "../entities/User"

class UserDAO {
/**
 * Esse é o nosso banco de dados
 */


  private _users: User[]

  constructor() {
    this._users = []
  }

  save(user: User) {
    this._users.push(user)
  }

  getAll(): User[] {
    return this._users
  }
}

export default UserDAO