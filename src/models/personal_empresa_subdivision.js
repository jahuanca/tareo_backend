'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal_Empresa_Subdivision extends Model {
    static associate(models) {
      
    }
  };
  Personal_Empresa_Subdivision.init({
    //add new parameters


    codigoempresa: {primaryKey: true, type: DataTypes.STRING, allowNull: false,},
    idsubdivision: {type: DataTypes.INTEGER, allowNull: false,},
    fechadesde: {type: DataTypes.DATE, allowNull: false,},
    fechahasta: {type: DataTypes.DATE, allowNull: false,},
    activo: {type: DataTypes.BOOLEAN, allowNull: false,},
    fechamod: {type: DataTypes.DATE, allowNull: false,},
    idusuario: {type: DataTypes.INTEGER, allowNull: false,},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Personal_Empresa_Subdivision',
    freezeTableName: true,
    timestamps: false,
    tableName: 'PersonalEmpresa_Subdivision'
  });


  return Personal_Empresa_Subdivision;
};