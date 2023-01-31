const AuthService = require('../services/auth.service')
const UsersService = require('../services/users.service')
const jwt = require('jsonwebtoken')
const mailer = require('../utils/mailer')
require('dotenv').config()

const authService = new AuthService()
const usersService = new UsersService()

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

      response.status(200).json({
        message: 'Correct Credentials!',
        token
      })
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

const forgetPassword = async (request, response, next) => {
  const { email } = request.body
  try {
    if (email) {
      let data = await authService.createRecoveryToken(email)
      let user = await usersService.setTokenUser(data.user.id, data.token)
      console.log("MAIL SEND:  ", user.email);
      mailer.sendMail({
        from: process.env.MAIL_SEND,
        to: user.email,
        subject: 'Restore Password ',
        html: `<span>${process.env.HOST_CLOUD}api/v1/auth/change-password/${data.token}</span>`
        // html: `<a href='${process.env.HOST_CLOUD}/api/v1/auth/change-password/${data.token}'>Restore password</a>`
      })
      response.status(200).json({ message: 'Email sended!, Check your inbox' })
    } else {
      response.status(400).json({ message: 'Invalid Email', fields: { email: 'example@example.com' } })
    }
  } catch (error) {
    next(error)
  }
}

const restorePassword = async (request, response, next) => {

  const data = JSON.parse(atob((request.params.token).split('.')[1]))
  const { password } = request.body
  try {
    if (data && password) {
      await authService.changePassword(data,password,(request.params.token))
      response.status(200).json({ message: 'update success' })
    } else {
      response.status(400).json({ message: 'Invalid Email', fields: { email: 'example@example.com' } })
    }
  } catch (error) {
    next(error)
  }
}


module.exports = {
  logIn,
  verifyUser,
  forgetPassword,
  restorePassword
}