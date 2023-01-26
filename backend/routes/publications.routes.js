const express = require('express')
const router = express.Router()

const { getPublications, getPublication, addPublication, removePublication } = require('../controllers/publications.controller')
const { getVotes } = require('../controllers/votes.controller')

router.route('/')
  .get(getPublications)
  .post(addPublication)

router.route('/:id')
  .get(getPublication)
  .delete(removePublication)

router.route('/:id/votes')
  .get(getVotes)

module.exports = router