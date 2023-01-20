const express = require('express');
const routesUsers = require('./users.routes')
const routesPublicationsTypes = require('./publicationsTypes.routes')
const routesPublications = require('./publications.routes')
const routesStates = require('./states.routes')



function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)


  router.use('/publications-types', routesPublicationsTypes)
  router.use('/publications', routesPublications)
  router.use('/users', routesUsers)
  router.use('./states',routesStates)

}

module.exports = routerModels;
