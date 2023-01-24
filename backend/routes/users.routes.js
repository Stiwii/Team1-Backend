const express = require('express');
const router = express.Router();

const {
    getUsers,
    addUser,
    getUser,
    updateUser,
    removeUser,
    getEmail
 } = require('../controllers/users.controller')

const { getVote } = require('../controllers/votes.controller')
const { getPublication} = require('../controllers/publications.controller')

//? this route is administrave
router.route('/')
  .get(getUsers)
// .post(addUser)
router.get('/mail/', getEmail)

//? this routes is for users loged
router.route('/:id')
  .get(getUser)
  .put(updateUser)
  // router.delete('/:id', removeUser)

router.route('/:id/votes')
  .get(getVote)

router.route('/:id/publications')
  .get(getPublication)

module.exports = router;