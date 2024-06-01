'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temp_Actividad extends Model {
    static associate(models) {
      
    }
  };
  Temp_Actividad.init({
    //add new parameters

    ACTIVIDAD: {primaryKey: true,type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    DESC_ACT: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    IND_JO_RE: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    SOCIEDAD: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    Fechamod: {type: DataTypes.DATE, allowNull: false},
    Horamod: {type: DataTypes.DATE, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Temp_Actividad',
    freezeTableName: true,
    tableName: 'Temp_Actividad'
  });
  return Temp_Actividad;
};