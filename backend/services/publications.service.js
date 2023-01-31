const models = require('../database/models')
const uuid = require('uuid')
const { Op, json } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const { response } = require('express')

class PublicationsService {

  constructor() {

  }

  async findAndCount(query) {
    const { limit, offset, tags } = query


    // let tagsIDs = tags.split(',')
    const options = {

    }


    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    // const { name } = query
    // if (name) {
    //   options.where.name = { [Op.iLike]: `%${name}%` }
    // }

    if (tags) {
      let tagsIDs = tags.split(',')
      options.include = [{ // El options que les di en el ejemplo 
        model: models.Tags,
        as: 'tags',
        required: true,
        where: { id: tagsIDs },
        through: { attributes: [] }
      }]
    }

    console.log(options)
    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const publications = await models.Publications.findAndCountAll(options)
    return publications
  }

  async findAndCount2(query, profileId) {
    const options = {
      where: { profile_id: profileId },
      // include: [{
      //   model: models.Publications.scope('public_view')
      // }]
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    options.distinct = true

    const votes = await models.Publications.scope('public_view').findAndCountAll(options)
    return votes
  }

  async createPublication({ profile_id, publication_type_id, title, description, content, picture, city_id, image_url, tags }) {
    const transaction = await models.sequelize.transaction()

    try {
      let newPublication = await models.Publications.create({
        id: uuid.v4(),
        profile_id: profile_id,
        publication_type_id: publication_type_id,
        title: title,
        description: description,
        content: content,
        picture: picture,
        city_id: city_id,
        image_url: image_url
      }, { transaction })

      let tags_ids = tags.split(',')
      console.log(tags_ids)
      await newPublication.setTags(tags_ids, { transaction })

      await transaction.commit()
      return newPublication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getPublicationOr404(id) {
    let publication = await models.Publications.findByPk(id)

    // if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found')

    return publication
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getPublication(id) {
    let publication = await models.Publications.findByPk(id, { raw: true })
    return publication
  }



  async updatePublication(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let publication = await models.Publications.findByPk(id)

      if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found')

      let updatedPublication = await publication.update(obj, {
        where: {
          id: id
        }
      }, { transaction })

      await transaction.commit()

      return updatedPublication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removePublication(id, profileId) {
    const transaction = await models.sequelize.transaction()
    try {
      let publication = await models.Publications.findByPk(id)

      if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found')

      if (publication.profile_id == profileId) {
        await publication.destroy({ transaction })
        await transaction.commit()

        return publication
      } else {
        return null
      }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = PublicationsService
