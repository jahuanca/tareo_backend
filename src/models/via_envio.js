'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Via_Envio extends Model {
    static associate(models) {
      
    }
  };
  Via_Envio.init({
    //add new parameters
    idvia: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false, },
    codigo: {type: DataTypes.INTEGER, allowNull: true, },
    detalle: {type: DataTypes.STRING, allowNull: true, },

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Via_Envio',
    freezeTableName: true,
    tableName: 'ViaEnvio'
  });
  return Via_Envio;
};