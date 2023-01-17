const models = require('../database/models');
const uuid = require('uuid')
const { Op } = require('sequelize');
const { CustomError } = require('../utils/custom-error');

class ProfilesService {

    constructor() {
    }

    async findAndCount(query) {
        const options = {
            where: {},
        }

        const { limit, offset } = query;
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }

        const { name } = query;
        if (name) {
            options.where.name = { [Op.iLike]: `%${name}%` };
        }

        //Necesario para el findAndCountAll de Sequelize
        options.distinct = true

        const roles = await models.Roles.findAndCountAll(options);
        return roles;
    }

    async createProfile({ userId,roleId,imageUrl,codePhone,phone,countryId }) {
        const transaction = await models.sequelize.transaction();
        try {
            let newProfile = await models.Profiles.create({
                id:uuid.v4(),
                user_id:userId,
                role_id:roleId,
                image_url:imageUrl,
                code_phone:codePhone,
                phone:phone,
                country_id:countryId
            }, { transaction });

            await transaction.commit();
            return newProfile
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getProfileOr404(id) {
        let profile = await models.Profiles.findByPk(id);

        if (!profile) throw new CustomError('Not found Profile', 404, 'Not Found');

        return profile
    }

    //Return not an Instance raw:true | we also can converted to Json instead
    async getProfile(id) {
        let profile = await models.Profiles.findByPk(id, { raw: true })
        return profile
    }

    async updateProfile(id, obj) {
        const transaction = await models.sequelize.transaction();
        try {
            let profile = await models.Profiles.findByPk(id);

            if (!profile) throw new CustomError('Not found profile', 404, 'Not Found')

            let updatedProfile = await profile.update(obj,{
                where: {
                    id: id
                }
            }, { transaction })

            await transaction.commit();

            return updatedProfile
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }

    async removeProfile(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let profile = await models.Profiles.findByPk(id)

            if (!profile) throw new CustomError('Not found profile', 404, 'Not Found')

            await profile.destroy({ transaction })

            await transaction.commit();

            return profile
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }

}

module.exports = ProfilesService;