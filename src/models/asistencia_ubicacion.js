'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AsistenciaUbicacion extends Model {
    static associate(models) {
      
    }
  };
  AsistenciaUbicacion.init({
    //add new parameters
    idubicacion: {type: DataTypes.INTEGER, primaryKey: true},
    ubicacion: {type: DataTypes.STRING(50), allowNull: true, validate: {notEmpty: true, len: [1,50]}},
    detallebreve: {type: DataTypes.STRING(10), allowNull: true, validate: {notEmpty: true, len: [1,10]}},


    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'AsistenciaUbicacion',
    freezeTableName: true,
    tableName: 'Asistencia_Ubicacion',
    timestamps: false,
  });
  return AsistenciaUbicacion;
};