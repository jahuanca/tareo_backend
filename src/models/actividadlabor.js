'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActividadLabor extends Model {
    static associate(models) {
      //Actividad.hasMany(models.Labor, {foreignKey: "idactividad",targetKey: 'idactividad'})
    }
  };
  ActividadLabor.init({
    //add new parameters
    
    idlabor        : {primaryKey: true, type: DataTypes.INTEGER, allowNull: false},
    codigolabor    : {type: DataTypes.STRING(200), allowNull: false},
    labor          : {type: DataTypes.STRING(200), allowNull: false},
    idactividad    : {type: DataTypes.INTEGER, allowNull: false},
    codigoactividad: {type: DataTypes.STRING(200), allowNull: false},
    actividad      : {type: DataTypes.STRING(200), allowNull: false},
    sociedad       : {type: DataTypes.STRING(200), allowNull: false},
    tipolabor      : {type: DataTypes.STRING(200), allowNull: false},
    estado         : {type: DataTypes.STRING(200), allowNull: false},
    
    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'ActividadLabor',
    freezeTableName: true,
    timestamps: false,
    tableName: 'v_actividad_labor'
  });
  return ActividadLabor;
};