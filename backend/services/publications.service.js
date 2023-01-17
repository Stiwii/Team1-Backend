const models = require('../database/models');
const uuid = require('uuid')
const { Op } = require('sequelize');
const { CustomError } = require('../utils/custom-error');

class PublicationsService {

    constructor(){

    }

    async findAndCount(query) {
        const options = {
            where: {},
        }
        
        const { limit, offset } = query;
          if (limit && offset) {
            options.limit =  limit;
            options.offset =  offset;
          }
        
        const { name } = query;
          if (name) {
            options.where.name = { [Op.iLike]: `%${name}%` };
          }

        //Necesario para el findAndCountAll de Sequelize
        options.distinct = true
    
        const publications = await models.Publications.findAndCountAll(options);
        return publications;
    }

    async createPublication(obj) {
        const transaction = await models.sequelize.transaction();
        try {
            let newPublication = await models.Publications.create({
                id:uuid.v4(),
                profile_id: obj.profile_id,
                publication_type_id:obj.publication_type_id,
                title:obj.title,
                description:obj.description,
                content:obj.content,
                picture: obj.picture,
                city_id: obj.city_id,
                image_url: obj.image_url
            }, { transaction });
            
            await transaction.commit();
            return newPublication
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }
	//Return Instance if we do not converted to json (or raw:true)
    async getPublicationOr404(id) {
        let publication = await models.Publications.findByPk(id);

        if(!publication) throw new CustomError('Not found Publication', 404, 'Not Found');

        return publication
    }

	//Return not an Instance raw:true | we also can converted to Json instead
    async getPublication(id) {
        let publication = await models.Publications.findByPk(id, {raw: true})
        return publication
    }

    async updatePublication(id, obj ) {
        const transaction = await models.sequelize.transaction();
        try {
            let publication = await models.Publications.findByPk(id);
    
            if(!publication) throw new CustomError('Not found Publication', 404, 'Not Found')
    
            let updatedPublication = await publication.update(obj,{
                where:{
                    id:id
                }
            }, { transaction })

            await transaction.commit();
    
           return updatedPublication
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }

    async removePublication(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let publication = await models.Publications.findByPk(id)
    
            if(!publication) throw new CustomError('Not found Publication', 404, 'Not Found')
    
            await publication.destroy({transaction})

            await transaction.commit();
    
           return publication
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }

  }
  
  module.exports = PublicationsService;