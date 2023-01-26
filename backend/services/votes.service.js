const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

class VotesService {

  constructor() {
  }

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const votes = await models.Votes.scope('public_view').findAndCountAll(options)
    return votes
  }

  async createVote({ publication_id, profile_id }) {
    const transaction = await models.sequelize.transaction()
    try {
      
      let validate = await models.Votes.scope('public_view').findOne({
        where: {
          publication_id: publication_id,
          profile_id: profile_id
        }
      }, { transaction })

      if (validate) {
        let value = await models.Votes.destroy({
          where: {
            publication_id: publication_id,
            profile_id: profile_id
          }
        },{transaction})
        await transaction.commit()
        return value
      }


      let data = await models.Votes.create({
        publication_id: publication_id,
        profile_id: profile_id
      },{transaction})

      await transaction.commit()
      return data
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getVoteOr404(id) {
    let vote = await models.Votes.findByPk(id)

    if (!vote) throw new CustomError('Not found Vote', 404, 'Not Found')

    return vote
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getVote(id) {
    let vote = await models.Votes.findByPk(id, { raw: true })
    return vote
  }

  async updateVote(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let vote = await models.Votes.findByPk(id)
      if (!vote) throw new CustomError('Not found vote', 404, 'Not Found')
      let updatedVote = await vote.update(obj, {
        where: {
          id: id
        }
      }, { transaction })
      await transaction.commit()
      return updatedVote
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeVote(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let vote = await models.Votes.findByPk(id)
      if (!vote) throw new CustomError('Not found vote', 404, 'Not Found')
      await vote.destroy({ transaction })
      await transaction.commit()
      return vote
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = VotesService