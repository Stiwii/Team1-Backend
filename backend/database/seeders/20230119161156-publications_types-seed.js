'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('roles', [
        {
          name: 'event',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'concert',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'tournament',
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

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('roles', {
        name: {
          [Op.or]: ['event', 'concert', 'tournament']
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
