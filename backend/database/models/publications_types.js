'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Publications_types.hasMany(models.Publications,  {as: 'publications', foreignKey: 'publication_id'})
    }
  }
  Publications_types.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Publications_types',
    tableName: 'publications_types',  // y la tabla en la DB para ser explicitos
    underscored: true,  
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
		// y minimizar que se nos escape algo
		scopes: {
      public_view: {
        attributes: ['id','name', 'description']
      },
      no_timestamps: {
        attributes: {exclude: ['created_at', 'updated_at']}
      },
    },
  });
  return Publications;
};