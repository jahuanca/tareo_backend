'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Esparrago_Agrupa_Personal extends Model {
    static associate(models) {
      
    }
  };
  Esparrago_Agrupa_Personal.init({
    itemagruparpersonal: {primaryKey: true ,type: DataTypes.INTEGER, allowNull: true,},
    fecha: {type: DataTypes.DATE, allowNull: true,},
    linea: {type: DataTypes.INTEGER, allowNull: true,},
    grupo: {type: DataTypes.INTEGER, allowNull: true,},
    turno: {type: DataTypes.STRING, allowNull: true,},
    fechamod: {type: DataTypes.DATE, allowNull: true,},
    idusuario: {type: DataTypes.INTEGER, allowNull: true,},
    idestado: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 1},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Esparrago_Agrupa_Personal',
    freezeTableName: true,
    timestamps: false,
    tableName: 'EsparragoAgrupaPersonal'
  });
  return Esparrago_Agrupa_Personal;
};