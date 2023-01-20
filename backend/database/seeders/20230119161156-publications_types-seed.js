'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('publications_types', [
        {
          name: 'event',
          description: 'event',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'concert',
          description: 'concert',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'tournament',
          description: 'tournament',
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
      await queryInterface.bulkDelete('publications_types', {
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
