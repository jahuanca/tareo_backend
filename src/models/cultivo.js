'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cultivo extends Model {
    static associate(models) {
      
    }
  };
  Cultivo.init({
    //add new parameters
    idcultivo: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false},
    detallecultivo: {type: DataTypes.STRING, allowNull: false},
    cultivo: {type: DataTypes.STRING, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Cultivo',
    freezeTableName: true,
    tableName: 'Cultivo'
  });
  return Cultivo;
};