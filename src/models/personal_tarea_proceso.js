'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonalTareaProceso extends Model {
    static associate(models) {
      
    }
  };
  PersonalTareaProceso.init({
    //add new parameters
    item: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false},
    itemtareoproceso: {type: DataTypes.INTEGER, allowNull: false},
    codigoempresa: {type: DataTypes.STRING, allowNull: false},
    transferidosap: {type: DataTypes.BOOLEAN, allowNull: true},
    horainicio: {type: DataTypes.DATE, allowNull: false},
    horafin: {type: DataTypes.DATE, allowNull: false},
    pausainicio: {type: DataTypes.DATE, allowNull: false},
    pausafin: {type: DataTypes.DATE, allowNull: false},
    fechafin: {type: DataTypes.DATE, allowNull: false},
    fechainicio: {type: DataTypes.DATE, allowNull: false},
    turno: {type: DataTypes.STRING, allowNull: false},
    diasiguiente: {type: DataTypes.BOOLEAN, allowNull: false},
    esrendimiento: {type: DataTypes.BOOLEAN, allowNull: false},
    esjornal: {type: DataTypes.BOOLEAN, allowNull: false},
    fechamod: {type: DataTypes.DATE, allowNull: false},
    cantidadhoras: {type: DataTypes.DOUBLE, allowNull: false},
    cantidadrendimiento: {type: DataTypes.DOUBLE, allowNull: false},
    cantidadavance: {type: DataTypes.DOUBLE, allowNull: false},
    idestado: {type: DataTypes.INTEGER, allowNull: false},
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    idactividad: {type: DataTypes.INTEGER, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'PersonalTareaProceso',
    freezeTableName: true,
    tableName: 'PersonalTareoProceso'
  });
  return PersonalTareaProceso;
};