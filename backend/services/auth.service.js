const UsersService = require('../services/users.service')
const { comparePassword } = require('../utils/crypto')
const usersService = new UsersService()

class AuthService {

  constructor() {
  }

  async checkUsersCredentials(email, password) {
    try {
      let user = await usersService.getUserByEmail(email)
      const verifyPassword = comparePassword(password, user.password)
      // console.log('FROM CHECKUSER: ',user.password)
      if (verifyPassword) {
        return user
      }
      return null
    } catch (error) {
      return null
    }
  }

}

module.exports = AuthService