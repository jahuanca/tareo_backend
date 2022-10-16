'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal_Pre_Tarea_Esparrago extends Model {
    static associate(models) {
      
    }
  };
  Personal_Pre_Tarea_Esparrago.init({
    //add new parameters
    itempersonalpretareaesparrago: {primaryKey: true, type: DataTypes.INTEGER, allowNull: true, autoIncrement: true},
    fecha: {type: DataTypes.DATE, allowNull: false},
    hora: {type: DataTypes.DATE, allowNull: false},
    idestado: {type: DataTypes.INTEGER, allowNull: false},
    itempretareaesparragovarios: {type: DataTypes.INTEGER, allowNull: true,},
    codigotkcaja: {type: DataTypes.STRING, allowNull: false},
    idlabor: {type: DataTypes.INTEGER, allowNull: false},
    idcliente: {type: DataTypes.INTEGER, allowNull: false},
    idviaenvio: {type: DataTypes.INTEGER, allowNull: false},
    idcalibre: {type: DataTypes.INTEGER, allowNull: false},
    idvia: {type: DataTypes.INTEGER, allowNull: false},
    correlativocaja: {type: DataTypes.INTEGER, allowNull: false},
    codigotkmesa: {type: DataTypes.STRING, allowNull: false},
    mesa: {type: DataTypes.STRING, allowNull: false},
    linea: {type: DataTypes.STRING, allowNull: false},
    correlativomesa: {type: DataTypes.INTEGER, allowNull: false},
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    fechamod: {type: DataTypes.DATE, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Personal_Pre_Tarea_Esparrago',
    freezeTableName: true,
    tableName: 'PersonalPreTareaEsparrago'
  });
  return Personal_Pre_Tarea_Esparrago;
};