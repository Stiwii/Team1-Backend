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
      await queryInterface.bulkInsert('countries', [
        {
          name: 'Argentina',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Bolivia',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Brasil',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Colombia',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Costa Rica',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Cuba',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Chile',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Dominica',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Ecuador',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'El Salvador',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Guatemala',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Haití',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Honduras',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'México',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Nicaragua',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Panamá',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Paraguay',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Perú',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'República Dominicana',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Trinidad y Tobago',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Uruguay',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Venezuela',
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
      await queryInterface.bulkDelete('countries', {
        name: {
          [Op.or]: ['Argentina','Bolivia','Brasil','Colombia','Costa Rica','Cuba','Chile','Dominica','Ecuador','El Salvador',
          'Guatemala','Haití','Honduras','México','Nicaragua','Panamá','Perú','República Dominicana','Trinidad y Tobago','Uruguay','Venezuela']
        } 
      }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  }
};