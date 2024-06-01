'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {
    static associate(models) {
      
    }
  };
  Turno.init({
    //add new parameters
    idturno: {type: DataTypes.INTEGER, primaryKey: true},
    detallebreve: {type: DataTypes.STRING(20), allowNull: true, validate: {notEmpty: true, len: [1,4]}},
    turno: {type: DataTypes.STRING(4), allowNull: true, validate: {notEmpty: true, len: [1,4]}},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Turno',
    freezeTableName: true,
    tableName: 'Asistencia_Turno',
    timestamps: false
  });
  return Turno;
};