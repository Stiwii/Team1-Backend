const express = require('express')
const router = express.Router()

const { getPublicationsTypes, getPublicationType } = require('../controllers/publications_types.controller')

router.route('/')
  .get(getPublicationsTypes)

router.route('/:id')
  .get(getPublicationType)

module.exports = router