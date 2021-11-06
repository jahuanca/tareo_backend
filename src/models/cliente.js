'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      
    }
  };
  Cliente.init({
    //add new parameters
    idcliente: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false, },
    idtipocliente: {type: DataTypes.INTEGER, allowNull: false, },
    abreviatura: {type: DataTypes.STRING, allowNull: false, },
    descripcion: {type: DataTypes.STRING, allowNull: false, },

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Cliente',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Cliente'
  });
  return Cliente;
};