
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreTareaEsparragoVarios extends Model {
    static associate(models) {
      
    }
  };
  PreTareaEsparragoVarios.init({
    //add new parameters
    itempretareaesparragovarios: {primaryKey:true, autoIncrement: true, type: DataTypes.INTEGER, allowNull: null, },
    fecha: {type: DataTypes.DATE, allowNull: null, },
    hora: {type: DataTypes.DATE, allowNull: null, },
    horainicio: {type: DataTypes.DATE, allowNull: null, },
    horafin: {type: DataTypes.DATE, allowNull: null, },
    pausainicio: {type: DataTypes.DATE, allowNull: null, },
    pausafin: {type: DataTypes.DATE, allowNull: null, },
    idestado: {type: DataTypes.INTEGER, allowNull: null, },
    idcentrocosto: {type: DataTypes.INTEGER, allowNull: null, },
    diasiguiente: {type: DataTypes.BOOLEAN, allowNull: null, },
    codigosupervisor: {type: DataTypes.STRING, allowNull: null, },
    codigodigitador: {type: DataTypes.STRING, allowNull: null, },
    linea: {type: DataTypes.INTEGER, allowNull: null, },

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Pre_Tarea_Esparrago_Varios',
    freezeTableName: true,
    tableName: 'PreTareaEsparragoVarios'
  });
  return PreTareaEsparragoVarios;
};