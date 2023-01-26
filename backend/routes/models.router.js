const express = require('express')
const routesUsers = require('./users.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

const routesProfiles = require('./profiles.routes')
const routesPublications = require('./publications.routes')
const routesPublicationsTypes = require('./publicationsTypes.routes')
// const routesCountries = require('./countries.routes')
// const routesCities = require('./cities.routes')
const routesStates = require('./states.routes')
const routesAuth = require('./auth.routes')


function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/auth', routesAuth)

  router.use('/users', routesUsers)
  // router.use('/users', isAuthenticatedByPassportJwt.authenticate('jwt', {session: false}) ,routesUsers)//<- middleware here
  // other models here

  // router.use('/users', routesUsers)
  router.use('/profiles', routesProfiles)
  router.use('/publications-types', routesPublicationsTypes)
  router.use('/publications', routesPublications)
  router.use('./states', routesStates)

}

module.exports = routerModels
