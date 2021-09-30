'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TareaProceso extends Model {
    static associate(models) {
      
    }
  };
  TareaProceso.init({
    //add new parameters
    itemtareoproceso: {primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    codigoempresa: {type: DataTypes.STRING, allowNull: false},
    fecha: {type: DataTypes.DATE, allowNull: false},
    idactividad: {type: DataTypes.INTEGER, allowNull: false},
    idlabor: {type: DataTypes.INTEGER, allowNull: false},
    idcentrocosto: {type: DataTypes.INTEGER, allowNull: false},
    turnotareo: {type: DataTypes.STRING, allowNull: false},
    fechamod: {type: DataTypes.DATE, allowNull: false},
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    idestado: {type: DataTypes.INTEGER, allowNull: false},
    escampo: {type: DataTypes.BOOLEAN, allowNull: false},
    espacking: {type: DataTypes.BOOLEAN, allowNull: false},
    esjornal: {type: DataTypes.BOOLEAN, allowNull: false},
    esrendimiento: {type: DataTypes.BOOLEAN, allowNull: false},
    horainicio: {type: DataTypes.DATE, allowNull: false},
    horafin: {type: DataTypes.DATE, allowNull: false},
    pausainicio: {type: DataTypes.DATE, allowNull: false},
    pausafin: {type: DataTypes.DATE, allowNull: false},
    diasiguiente: {type: DataTypes.BOOLEAN, allowNull: false},
    firmasupervisor: {type: DataTypes.STRING, allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'TareaProceso',
    freezeTableName: true,
    timestamps: false,
    tableName: 'TareoProceso'
  });

  return TareaProceso;
};