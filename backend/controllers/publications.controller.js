const PublicationsService = require('../services/publications.service');
const { getPagination, getPagingData } = require('../utils/sequelize-utils');

const publicationsService = new PublicationsService()

const getPublications = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query
    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let publications = await publicationsService.findAndCount(query)
    const results = getPagingData(publications, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addPublication = async (request, response, next) => {

  try {
    let profile_id = request.user.profileId
    let { publication_type_id, title, description, content, picture, city_id, image_url } = request.body
    let publication = await publicationsService.createPublication({ profile_id, publication_type_id, title, description, content, picture, city_id, image_url })

    return response.status(201).json({ results: publication })
  } catch (error) {
    response.status(400).json({
      message: error.message, fields: {
        publication_type_id: 'number',
        title: 'string',
        description: 'string',
        content: 'string',
        picture: 'string',
        city_id: 'number',
        image_url: 'string_URL'
      }
    })
  }
}

const getPublication = async (request, response, next) => {
  try {
    let { id } = request.params
    // let profileId = request.user.profileId
    let publications = await publicationsService.getPublicationOr404(id)
    return response.json({ results: publications })
  } catch (error) {
    next(error)
  }
}

const updatePublication = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let publication = await publicationsService.updatePublication(id, body)
    return response.json({ results: publication })
  } catch (error) {
    next(error)
  }
}

const removePublication = async (request, response, next) => {
  try {
    let { id } = request.params
    let profileId = request.user.profileId
    let publication = await publicationsService.removePublication(id, profileId)
    return response.json({ results: publication, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPublications,
  addPublication,
  getPublication,
  updatePublication,
  removePublication
}