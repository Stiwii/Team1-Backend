'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Publications.belongsTo(models.Profiles)
      // Publications_types.hasMany(models.Votes, {as: 'votes', foreignKey: 'publication_id'})
      // Publications.belongsTo(models.Cities)
      // Publications.belongsTo(models.Publications_types)
    }
  }
  Publications.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Profile,
        key: 'id'
      }
    },
    publication_type_id: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: Publications_types,
        key: 'id'
      }
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    picture: {
      allowNull: false,
      type: DataTypes.STRING,
      validate:{
        isUrl:true
      }
    },
    city_id: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: Cities,
        key: 'id'
      }
    },
    image_url: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'Publications',
    tableName: 'publications',  // y la tabla en la DB para ser explicitos
    underscored: true,  
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
		// y minimizar que se nos escape algo
		scopes: {
      public_view: {
        attributes: ['id','profile_id', 'publication_type_id', 'title', 'description', 'content', 'picture', 'city_id', 'image_url']
      },
      no_timestamps: {
        attributes: {exclude: ['created_at', 'updated_at']}
      },
    },
  });
  return Publications;
};