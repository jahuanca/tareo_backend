
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreTareaEsparragoFormato extends Model {
    static associate(models) {
      
    }
  };
  PreTareaEsparragoFormato.init({
    //add new parameters
    itemprestareaesparragoformato: {primaryKey:true, autoIncrement: true, type: DataTypes.INTEGER, allowNull: null,},
    fecha: {type: DataTypes.DATE, allowNull: null,},
    hora: {type: DataTypes.DATE, allowNull: null,},
    idestado: {type: DataTypes.INTEGER, allowNull: null,},
    itempretareaesparrago: {type: DataTypes.INTEGER, allowNull: null,},
    codigotk: {type: DataTypes.STRING, allowNull: null,},
    idlabor: {type: DataTypes.INTEGER, allowNull: null,},
    idactividad: {type: DataTypes.INTEGER, allowNull: null,},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Pre_Tarea_Esparrago_Formato',
    freezeTableName: true,
    timestamps: false,
    tableName: 'PreTareaEsparragoFormato'
  });
  return PreTareaEsparragoFormato;
};