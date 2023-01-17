const express = require('express');
const routesUsers = require('./users.routes')
const routesPublications = require('./publications.routes')
const routesCountries = require('./countries.routes')
const routesCities = require('./cities.routes')


function routerModels(app) {
    const router = express.Router();
    
    app.use('/api/v1', router);

    router.use('/users',routesUsers)
    router.use('/publications',routesPublications)
    router.use('/countries',routesCountries)
    router.use('/cities',routesCities)
    // router.use('/publications_types',routes)
		// other models here
  }
  
  module.exports = routerModels;