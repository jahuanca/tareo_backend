'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Absentismo extends Model {
    static associate(models) {
      
    }
  };
  Absentismo.init({
    //add new parameters
    codigosap: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
    nombrecompleto: {type: DataTypes.STRING, allowNull: false},
    codigo: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
    descripcion: {type: DataTypes.STRING, allowNull: false},
    fechainicio: {type: DataTypes.DATE, primaryKey: true, allowNull: false},
    fechafin: {type: DataTypes.DATE, primaryKey: true, allowNull: false},
    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Absentismo',
    freezeTableName: true,
    timestamps: false,
    tableName: 'v_absentismos'
  });
  return Absentismo;
};