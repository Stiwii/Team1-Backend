const express = require('express');
const router = express.Router();

const publicationsControllers = require('../controllers/publications.controller')

// router.route('/')
//     .get(publicationsControllers.getPublications)
//     .post(publicationsControllers.addPublication)

// router.route('/:id')
//     .get(publicationsControllers.getPublication)
//     .put(publicationsControllers.updatePublication)
//     .delete(publicationsControllers.removePublication)

module.exports = router;