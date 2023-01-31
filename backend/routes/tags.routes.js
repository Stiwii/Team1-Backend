const express = require('express')
const  router = express.Router()
const passportJWT = require('../libs/passport')

const { getTags, addTag, updateTag, removeTag } = require('../controllers/tags.controller')



router.route('/')
  .get(getTags) //? this route is piblic
  .post(passportJWT.authenticate('jwt', { session: false }), addTag)//?this route is administrative


//? this route is administrative
router.route('/:id')
  .put(passportJWT.authenticate('jwt', { session: false }),updateTag)
  .delete(passportJWT.authenticate('jwt', { session: false }),removeTag)

module.exports = router