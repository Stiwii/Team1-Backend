const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')

const {
  getUsers,
  getUser,
  updateUser,
  getInfoUser,
  getEmail
} = require('../controllers/users.controller')

const { getVotes } = require('../controllers/votes.controller')
const {  getPublicationsofUser } = require('../controllers/publications.controller')

//? this route is administrave
router.route('/')
  .get(passportJWT.authenticate('jwt', { session: false }),getUsers)

router.get('/mail/', getEmail)
router.get('/user-info', passportJWT.authenticate('jwt', { session: false }), getInfoUser)

//? this routes is for users loged
router.route('/:id')
  .get(passportJWT.authenticate('jwt', { session: false }),getUser)
  .put(passportJWT.authenticate('jwt', { session: false }),updateUser)
// router.delete('/:id', removeUser)

router.route('/:id/votes')
  .get(passportJWT.authenticate('jwt', { session: false }),getVotes)

router.route('/:id/publications')
  .get(passportJWT.authenticate('jwt', { session: false }),getPublicationsofUser)

module.exports = router