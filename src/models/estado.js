'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    static associate(models) {
      
    }
  };
  Estado.init({
    //add new parameters
    idestado: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false, },
    detalle: {type: DataTypes.INTEGER, allowNull: true, },
    estado: {type: DataTypes.STRING, allowNull: true, },

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Estado',
    freezeTableName: true,
    tableName: 'Estados'
  });
  return Estado;
};