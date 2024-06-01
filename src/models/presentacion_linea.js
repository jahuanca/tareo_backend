'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presentacion_Linea extends Model {
    static associate(models) {
      
    }
  };
  Presentacion_Linea.init({
    //add new parameters
    idpresentacion: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false},
    detalle: {type: DataTypes.STRING, allowNull: false},
    codigoempresa: {type: DataTypes.STRING, allowNull: false},


    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Presentacion_Linea',
    freezeTableName: true,
    timestamps:false,
    //tableName: 'PresentacionLinea'
    tableName: 'Presentacion'
  });
  return Presentacion_Linea;
};