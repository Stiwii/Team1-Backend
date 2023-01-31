const AuthService = require('../services/auth.service')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const authService = new AuthService()

const logIn = async (request, response, next) => {
  const { email, password } = request.body
  try {
    const user = await authService.checkUsersCredentials(email, password)
    if (user) {
      const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.profile[0].role.name,
        profileId: user.profile[0].id
      }, process.env.JWT_SECRET_WORD)

      if (user.profile[1]) {
        const tokenAdmin = jwt.sign({
          id: user.id,
          email: user.email,
          role: user.profile[1].role.name,
          profileId: user.profile[1].id
        }, process.env.JWT_SECRET_WORD)

        response.status(200).json({
          message: 'Correct Credentials!',
          token,
          tokenAdmin
        })
      } else{
        response.status(200).json({
          message: 'Correct Credentials!',
          token
        })
      }
    } else {
      response.status(401).json({ message: 'Invalid Credentials' })
    }
  } catch (error) {
    next(error)
  }
}

const verifyUser = async (request, response, next) => {
  const id = request.params.id
  try {
    const user = await authService.getInfo(id)
    if (user) {
      response.status(200).json({ message: 'Verify user succesfully!' })
    } else {
      response.status(400).json({ message: 'Already verified user' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  logIn,
  verifyUser
}