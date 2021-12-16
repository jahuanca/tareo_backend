
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
    fecha: {type: DataTypes.DATEONLY, allowNull: false, },
    fechamod: {type: DataTypes.DATE, allowNull: false, },
    hora: {type: DataTypes.DATE, allowNull: false, },
    horainicio: {type: DataTypes.DATE, allowNull: false, },
    horafin: {type: DataTypes.DATE, allowNull: null, },
    pausainicio: {type: DataTypes.DATE, allowNull: true, },
    pausafin: {type: DataTypes.DATE, allowNull: true, },
    idestado: {type: DataTypes.INTEGER, allowNull: false, },
    idusuario: {type: DataTypes.INTEGER, allowNull: false, },
    idcentrocosto: {type: DataTypes.INTEGER, allowNull: false, },
    idtipotarea: {type: DataTypes.INTEGER, allowNull: false, },
    diasiguiente: {type: DataTypes.BOOLEAN, allowNull: false, },
    codigosupervisor: {type: DataTypes.STRING, allowNull: false, },
    codigodigitador: {type: DataTypes.STRING, allowNull: false, },
    turnotareo: {type: DataTypes.STRING, allowNull: false, },
    linea: {type: DataTypes.INTEGER, allowNull: false, },

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