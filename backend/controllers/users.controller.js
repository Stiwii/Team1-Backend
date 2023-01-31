const UsersService = require('../services/users.service')
const mailer = require('../utils/mailer')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

require('dotenv').config()

const usersService = new UsersService()

const getUsers = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query
    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let users = await usersService.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addUser = async (request, response, next) => {
  try {
    let { body } = request
    let user = await usersService.createUser(body)
    return response.status(201).json({ results: user })
  } catch (error) {
    next(error)
  }
}

const registerUser = async (request, response, next) => {
  try {
    let { body } = request
    let user = await usersService.setUser(body)
    // await mailer.sendMail({
    //   from: process.env.MAIL_SEND,
    //   to: user.email,
    //   subject: `Verify account ${user.firstName} From Harmonyk`,
    //   html: `<h1>Enter the following link to verify your account: ${process.env.HOST_CLOUD}/api/v1/auth/verify-user/${user.id}</h1> `,
    //   text: 'Thanks you',
    // })
    return response.status(201).json({ results: user })
  } catch (error) {
    // response.status(400).json({
    //   message: error.message, fields: {
    //     firstName: 'String',
    //     lastName: 'String',
    //     username: 'String',
    //     email: 'example@example.com',
    //     password: 'String',
    //     imageUrl: 'StringURL',
    //     codePhone: 'number',
    //     phone: 'number'
    //   }
    // })
    next(error)
  }
}

const getUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let userId = request.user.id
    if(userId===id){
      let users = await usersService.getMyUser(id)
      return response.json({ results: users })
    }else{
      return response.status(404).json({message: 'Invalid User'})
    }
  } catch (error) {
    next(error)
  }
}

const getInfoUser = async (request, response, next) => {
  try {
    let id = request.user.id
    let user = await usersService.getInfo(id)
    return response.json({ results: user })
  } catch (error) {
    next(error)
  }
}

const getEmail = async (request, response, next) => {
  try {
    let { email } = request.body
    let users = await usersService.getUserByEmail(email)
    return response.json({ results: users })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let profile_id = request.user.profileId
    if (id == request.user.id) {
      let { username, first_name, last_name, image_url, code_phone, phone } = request.body
      let user = await usersService.updateUser(id, { profile_id, username, first_name, last_name, image_url, code_phone, phone })
      return response.status(200).json({ result: user })
    }
  } catch (error) {
    next(error)
  }
}


const removeUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let user = await usersService.removeUser(id)
    return response.json({ results: user, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  addUser,
  registerUser,
  getUser,
  updateUser,
  removeUser,
  getEmail,
  getInfoUser
}