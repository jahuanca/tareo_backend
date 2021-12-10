'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resumen_Varios extends Model {
    static associate(models) {
      
    }
  };
  Resumen_Varios.init({
    //add new parameters
    imei: {type: DataTypes.STRING(200), allowNull: true,},
    turno: {type: DataTypes.STRING, allowNull: true,},
    fecha: {type: DataTypes.DATE, allowNull: true,},
    cantidad_cajas: {type: DataTypes.INTEGER, allowNull: true,},
    cantidad_personas: {type: DataTypes.INTEGER, allowNull: true,},

    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: DataTypes.DATE, allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Resumen_Varios',
    freezeTableName: true,
    tableName: 'Resumen_Varios'
  });
  return Resumen_Varios;
};