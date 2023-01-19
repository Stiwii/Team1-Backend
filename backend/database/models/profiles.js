'use strict';
const {Model} = require('sequelize');
const models = require('./')
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
		/*
			Siempre empezaremos definiendo el modelo Js a referenciar
			Seguido de los datos: 
			as: que servirá de alias en las consultas y mixins
			
			foreignKey: Aquí especificamos de acuerdo con la función.
				1.- belongsTo: 'El campo en esta tabla que es FK es:'
				2.- hasOne, hasMany, belongsToMany: 'El campo en la otra tabla que es FK es:'

			through: Solo funciona en belongsToMany, especiifica la tabla pivote usando el modelo js
		*/
      // Relations - PROFILES
      
      Profiles.belongsTo(models.Users)
      Profiles.belongsTo(models.Votes)
      Profiles.belongsTo(models.Publications)
      Profiles.hasMany(models.Roles, {as: 'roles', foreignKey: 'role_id'})
      Profiles.hasMany(models.Countries, {as: 'countries', foreignKey: 'country_id'})

			// Consejo avanzado, esta aquí por si más adelante hay una lección.
			// Algunas veces, el scope tendrá includes
      // para evitar errores es usual usarlo así
      // Profiles.addScope('scope_name', {});
    }
  };
  Profiles.init({
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
      onDelete: 'RESTRICT' // Elijan como quieren que se comporte la DB
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'roles',
        key: 'id'
      },
      onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
      onDelete: 'RESTRICT' // Elijan como quieren que se comporte la DB
    },
    country_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'countries',
        key: 'id'
      },
      onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
      onDelete: 'RESTRICT' // Elijan como quieren que se comporte la DB
    },
    image_url: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    code_phone: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    phone: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Profiles',  // Hacemos la diferencia del modelo
    tableName: 'profiles',  // y la tabla en la DB para ser explicitos
    underscored: true,  
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
		// y minimizar que se nos escape algo
		scopes: {
      public_view: {
        attributes: ['id','first_name','last_name','email','token']
      },
      no_timestamps: {
        attributes: {exclude: ['created_at', 'updated_at']}
      },
    },
  });
  return Profiles;
};