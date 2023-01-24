const models = require('../database/models');
const uuid = require('uuid')
const { hashPassword } = require('../utils/crypto')
const { Op } = require('sequelize');
const { CustomError } = require('../utils/custom-error');


class UsersService {

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

        const users = await models.Users.scope('public_view').findAndCountAll(options);
        return users;
    }

    async createUser({ first_name, last_name, email, username, password }) {
        const transaction = await models.sequelize.transaction();
        try {
            let newUser = await models.Users.create({
                id: uuid.v4(),
                first_name: first_name,
                last_name: last_name,
                email: email,
                username: username,
                password: hashPassword(password)
            }, { transaction });

            await transaction.commit();
            return newUser
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }

    async setUser({ firstName, lastName, email, username, password, countryId, imageUrl, codePhone, phone }) {
        const transaction = await models.sequelize.transaction();
        try {
            let newUser = await models.Users.create({
                id: uuid.v4(),
                first_name: firstName,
                last_name: lastName,
                email: email,
                username: username,
                password: hashPassword(password)
            }, { transaction });
            let newProfile = await models.Profiles.create({
                id: uuid.v4(),
                user_id: newUser.id,
                role_id: "2",
                country_id: countryId,
                image_url: imageUrl,
                code_phone: codePhone,
                phone: phone
            }, { transaction });

            await transaction.commit();
            return {
                id: newUser.id,
                firstName: newUser.first_name,
                lastName: newUser.last_name,
                email: newUser.email,
                username: newUser.username,
                roleId: newProfile.role_id,
                countryId: newProfile.country_id,
                codePhone: newProfile.code_phone,
                Phone: newProfile.phone
            }
        } catch (error) {
            await transaction.commit();
            throw error
        }
    }

    //Return Instance if we do not converted to json (or raw:true)
    async getUserOr404(id) {
        let user = await models.Users.findByPk(id);

        if (!user) throw new CustomError('Not found User', 404, 'Not Found');

        return user
    }

    //Return not an Instance raw:true | we also can converted to Json instead
    async getUser(id) {
        let user = await models.Users.findByPk(id, { raw: true })
        return user
    }
  // async getUser(id) {
    //     let user = await models.Users.findByPk(id, { raw: true })
    //     return user
    // }


    async getUserByEmail(email) {
        let user = await models.Users.findOne({
            where: {
                email: email
            },
            include: {
                model:  models.Profiles,
                as: 'profiles',
                attributes: ['id']
            }
        })
        return user
    }

    async updateUser(id, obj) {
        const transaction = await models.sequelize.transaction();
        try {
            let user = await models.Users.findByPk(id);

            if (!user) throw new CustomError('Not found user', 404, 'Not Found')

            let updatedUser = await user.update(obj, {
                where: {
                    id: id
                }
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

            if (!user) throw new CustomError('Not found user', 404, 'Not Found')

            await user.destroy({ transaction })

            await transaction.commit();

            return user
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }

}

module.exports = UsersService;