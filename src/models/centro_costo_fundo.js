'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Centro_Costo_Fundo extends Model {
    static associate(models) {
      
    }
  };
  Centro_Costo_Fundo.init({
    //add new parameters
    idcentrocosto: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false},
    idturno: {type: DataTypes.INTEGER, allowNull: false},
    Fechamod: {type: DataTypes.DATE, allowNull: false},
    activo: {type: DataTypes.BOOLEAN, allowNull: false},
    idusuario: {type: DataTypes.INTEGER, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Centro_Costo_Fundo',
    freezeTableName: true,
    timestamps: false,
    tableName: 'CentroCostoFundos'
  });
  return Centro_Costo_Fundo;
};