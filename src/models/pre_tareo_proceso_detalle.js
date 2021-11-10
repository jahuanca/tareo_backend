'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pre_Tareo_Proceso_Detalle extends Model {
    static associate(models) {
      
    }
  };
  Pre_Tareo_Proceso_Detalle.init({
    //add new parameters
    item: {primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER},
    codigoempresa: {type: DataTypes.STRING, allowNull: false,},
    itempretareaproceso: {type: DataTypes.INTEGER, allowNull: false,},
    numcaja: {type: DataTypes.INTEGER, allowNull: false,},
    fecha: {type: DataTypes.DATEONLY, allowNull: false,},
    hora: {type: DataTypes.DATE, allowNull: false,},
    imei: {type: DataTypes.STRING, allowNull: false,},
    idusuario: {type: DataTypes.INTEGER, allowNull: false,},
    idestado: {type: DataTypes.INTEGER, allowNull: false,},
    codigotk: {type: DataTypes.STRING, allowNull: true,},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Pre_Tareo_Proceso_Detalle',
    freezeTableName: true,
    timestamps: false,
    tableName: 'PreTareoProcesoDetalle'
  });
  return Pre_Tareo_Proceso_Detalle;
};