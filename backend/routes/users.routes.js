const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUser,
  updateUser } = require('../controllers/users.controller')

const { getVote } = require('../controllers/votes.controller')
const { getPublication} = require('../controllers/publications.controller')

//? this route is administrave
router.route('/')
  .get(getUsers)

//? this routes is for users loged
router.route('/:id')
  .get(getUser)
  .put(updateUser)

router.route('/:id/votes')
  .get(getVote)

router.route('/:id/publications')
  .get(getPublication)


module.exports = router;