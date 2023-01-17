//Seeder creado

//noten que es igual a una migración!

'use strict';
const { Op } = require("sequelize");
const {v4: uuid4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('profiles', [
        {
          id: '',
          user_id:'',
          role_id:'',
          country_id:'',
          image_url:'',
          code_phone:'',
          phone:'',
          created_at: new Date(),
          updated_at: new Date()
        }
    ], { transaction })

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('profiles', {
        id: {
          [Op.or]: []
        } 
      }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  }
};