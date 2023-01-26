const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')

const { getPublications, getPublication, addPublication, removePublication } = require('../controllers/publications.controller')
const { addVote } = require('../controllers/votes.controller')

router.route('/')
  .get(getPublications)
  .post(passportJWT.authenticate('jwt', { session: false }),addPublication)

router.route('/:id')
  .get(getPublication)
  .delete(passportJWT.authenticate('jwt', { session: false }),removePublication)

router.route('/:id/votes')
  .get(passportJWT.authenticate('jwt', { session: false }),addVote)

module.exports = router