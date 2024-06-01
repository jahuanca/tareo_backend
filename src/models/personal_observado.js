'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal_Observado extends Model {
    static associate(models) {
      
    }
  };
  Personal_Observado.init({
    //add new parameters
    DNI: {type: DataTypes.STRING(8), primaryKey: true, allowNull: true, validate: {notEmpty: true, len: [1,8]}},
    APELLIDOS: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    NOMBRE: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    BEGDA: {type: DataTypes.DATE, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    ENDDA: {type: DataTypes.DATE, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    //Fechamod: {type: DataTypes.DATE, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    //Horamod: {type: DataTypes.DATE, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Personal_Observado',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Temp_Observados'
  });


  return Personal_Observado;
};