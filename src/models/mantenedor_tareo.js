'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mantenedor_Tareo extends Model {
    static associate(models) {
      
    }
  };
  Mantenedor_Tareo.init({
    //add new parameters
    idmantenedor: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false, },
    detallemantenedor: {type: DataTypes.STRING(200), allowNull: false, },
    fechamod: {type: DataTypes.DATE, allowNull: false, },

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Mantenedor_Tareo',
    freezeTableName: true,
    timestamps: false,
    tableName: 'MantenedorTareo'
  });
  return Mantenedor_Tareo;
};