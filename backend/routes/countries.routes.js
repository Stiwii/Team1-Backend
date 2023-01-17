const express = require('express');
const router = express.Router();

const countriesControllers = require('../controllers/countries.controller')

router.route('/')
    .get(countriesControllers.getCountries)
    .post(countriesControllers.addCountry)

router.route('/:id')
    // .get(countriesControllers.getCountry)
    // .put(countriesControllers.updateCountry)
    .delete(countriesControllers.removeCountry)

module.exports = router;