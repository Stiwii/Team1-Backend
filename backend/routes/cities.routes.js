const express = require('express');
const router = express.Router();

const citiesControllers = require('../controllers/cities.controller')

router.route('/')
    .get(citiesControllers.getCities)
    .post(citiesControllers.addCity)

router.route('/:id')
    // .get(citiesControllers.getCity)
    // .put(citiesControllers.updateCity)
    .delete(citiesControllers.removeCity)

module.exports = router;