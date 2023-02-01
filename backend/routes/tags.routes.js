const express = require('express')
const  router = express.Router()
const passportJWT = require('../libs/passport')
const roleMiddleware= require('../middlewares/role.middleware')


const { getTags, addTag, updateTag, removeTag } = require('../controllers/tags.controller')



router.route('/')
  .get(getTags) //? this route is piblic
  .post(passportJWT.authenticate('jwt', { session: false }),roleMiddleware, addTag)//?this route is administrative


//? this route is administrative
router.route('/:id')
  .put(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,updateTag)
  .delete(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,removeTag)

module.exports = router