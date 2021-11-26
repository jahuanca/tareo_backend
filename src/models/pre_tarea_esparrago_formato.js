
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
    fecha: {type: DataTypes.DATEONLY, allowNull: false,},
    fechamod: {type: DataTypes.DATE, allowNull: false,},
    hora: {type: DataTypes.DATE, allowNull: false,},
    idestado: {type: DataTypes.INTEGER, allowNull: false,},
    itempretareaesparrago: {type: DataTypes.INTEGER, allowNull: false,},
    codigotk: {type: DataTypes.STRING, allowNull: false,},
    idlabor: {type: DataTypes.INTEGER, allowNull: false,},
    idcliente: {type: DataTypes.INTEGER, allowNull: false,},
    idusuario: {type: DataTypes.INTEGER, allowNull: true,},
    idactividad: {type: DataTypes.INTEGER, allowNull: false,},
    linea: {type: DataTypes.INTEGER, allowNull: false,},

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