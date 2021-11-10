'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreTareaEsparrago extends Model {
    static associate(models) {
      
    }
  };
  PreTareaEsparrago.init({
    itempretareaesparrago: {primaryKey:true, autoIncrement: true, type: DataTypes.INTEGER, allowNull: false}, 
    fecha: {type: DataTypes.DATEONLY, allowNull: false}, 
    horainicio: {type: DataTypes.DATE, allowNull: false}, 
    horafin: {type: DataTypes.DATE, allowNull: false}, 
    pausainicio: {type: DataTypes.DATE, allowNull: true}, 
    pausafin: {type: DataTypes.DATE, allowNull: true}, 
    idestado: {type: DataTypes.INTEGER, allowNull: false}, 
    idcentrocosto: {type: DataTypes.INTEGER, allowNull: false}, 
    diasiguiente: {type: DataTypes.BOOLEAN, allowNull: false}, 
    codigosupervisor: {type: DataTypes.STRING, allowNull: false}, 
    codigodigitador: {type: DataTypes.STRING, allowNull: false}, 
    linea: {type: DataTypes.INTEGER, allowNull: false}, 
    idtipotarea: {type: DataTypes.INTEGER, allowNull: false}, 

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Pre_Tarea_Esparrago',
    freezeTableName: true,
    timestamps: false,
    tableName: 'PreTareaEsparrago'
  });
  return PreTareaEsparrago;
};