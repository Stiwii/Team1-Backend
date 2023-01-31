const express = require('express')
const router = express.Router()

const { getRoles, addRole } = require('../controllers/roles.controller')

router.route('/')
  .get(getRoles)
  .post(addRole)


module.exports = router