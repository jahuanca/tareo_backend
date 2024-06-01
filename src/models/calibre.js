'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calibre extends Model {
    static associate(models) {
      
    }
  };
  Calibre.init({
    //add new parameters
    idcalibre: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false, },
    codigo: {type: DataTypes.INTEGER, allowNull: true, },
    detalle: {type: DataTypes.STRING, allowNull: true, },

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Calibre',
    freezeTableName: true,
    tableName: 'Calibre'
  });
  return Calibre;
};