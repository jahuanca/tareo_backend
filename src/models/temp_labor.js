'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temp_Labor extends Model {
    static associate(models) {
      
    }
  };
  Temp_Labor.init({
    //add new parameters

    LABOR: {primaryKey: true,type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    DESC_LABOR: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    ACTIVIDAD: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
    modelName: 'Temp_Labor',
    freezeTableName: true,
    tableName: 'Temp_Labor'
  });
  return Temp_Labor;
};