'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Centro_Costo extends Model {
    static associate(models) {
      
    }
  };
  Centro_Costo.init({
    //add new parameters
    idcentrocosto: {primaryKey: true , type: DataTypes.INTEGER, allowNull: false},
    detallecentrocosto: {type: DataTypes.STRING, allowNull: false},
    idsociedad: {type: DataTypes.INTEGER, allowNull: false},
    idtipocentrocosto: {type: DataTypes.INTEGER, allowNull: false},
    homologacion: {type: DataTypes.STRING, allowNull: false},
    activo: {type: DataTypes.BOOLEAN, allowNull: false},
    fechamod: {type: DataTypes.DATE, allowNull: false},
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    codigoempresa: {type: DataTypes.STRING, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Centro_Costo',
    freezeTableName: true,
    timestamps: false,
    tableName: 'CentroCosto'
  });
  return Centro_Costo;
};