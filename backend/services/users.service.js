const models = require('../database/models');
const { Op } = require('sequelize');
const { CustomError } = require('../utils/custom-error');

class UsersService {

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
    
        const users = await models.Users.findAndCountAll(options);
        return users;
    }

    async createUser({ name }) {
        const transaction = await models.sequelize.transaction();
        try {
            let newUser = await models.Users.create({
	                //id: uuid4() --> aquí se debe usar el uuid maker si es que se usa
									name,
            }, { transaction });
            
            await transaction.commit();
            return newUser
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }
	//Return Instance if we do not converted to json (or raw:true)
    async getUserOr404(id) {
        let user = await models.Users.findByPk(id);

        if(!user) throw new CustomError('Not found User', 404, 'Not Found');

        return user
    }

	//Return not an Instance raw:true | we also can converted to Json instead
    async getUser(id) {
        let user = await models.Users.findByPk(id, {raw: true})
        return user
    }

    async updateUser(id, { name } ) {
        const transaction = await models.sequelize.transaction();
        try {
            let user = await models.Users.findByPk(id);
    
            if(!user) throw new CustomError('Not found user', 404, 'Not Found')
    
            let updatedUser = await user.update({
                name
            }, { transaction })

            await transaction.commit();
    
           return updatedUser
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }

    async removeUser(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let user = await models.Users.findByPk(id)
    
            if(!user) throw new CustomError('Not found user', 404, 'Not Found')
    
            await user.destroy({transaction})

            await transaction.commit();
    
           return user
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }

  }
  
  module.exports = UsersService;