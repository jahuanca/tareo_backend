'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonalEmpresa_Subdivision extends Model {
    static associate(models) {
      
    }
  };
  PersonalEmpresa_Subdivision.init({
    //add new parameters
    codigoempresa: {primaryKey:true, type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    idsubdivision: {primaryKey:true, type: DataTypes.INTEGER, allowNull: true},
    fechadesde: {type: DataTypes.DATE, allowNull: true},
    fechahasta: {type: DataTypes.DATE, allowNull: true},
    activo: {type: DataTypes.BOOLEAN, allowNull: true},
    fechamod: {type: DataTypes.DATE, allowNull: true},
    idusuario: {type: DataTypes.INTEGER, allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'PersonalEmpresa_Subdivision',
    freezeTableName: true,
    tableName: 'PersonalEmpresa_Subdivision'
  });

  PersonalEmpresa_Subdivision.associate = function(models) {
    PersonalEmpresa_Subdivision.belongsTo(models.Personal_Empresa, {foreignKey: "codigoempresa",targetKey: 'codigoempresa'})
  };


  return PersonalEmpresa_Subdivision;
};