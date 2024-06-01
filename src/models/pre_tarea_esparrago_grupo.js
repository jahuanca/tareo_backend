
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreTareaEsparragoGrupo extends Model {
    static associate(models) {
      
    }
  };
  PreTareaEsparragoGrupo.init({
    //add new parameters
    itempretareaesparragogrupo: {primaryKey:true, autoIncrement: true, type: DataTypes.INTEGER, allowNull: false, },
    fecha: {type: DataTypes.DATEONLY, allowNull: false, },
    fechamod: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now()},
    turnotareo: {type: DataTypes.STRING, allowNull: false, },
    horainicio: {type: DataTypes.DATE, allowNull: false, },
    horafin: {type: DataTypes.DATE, allowNull: false, },
    pausainicio: {type: DataTypes.DATE, allowNull: true, },
    pausafin: {type: DataTypes.DATE, allowNull: true, },
    idestado: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 1},
    idcentrocosto: {type: DataTypes.INTEGER, allowNull: false, },
    diasiguiente: {type: DataTypes.BOOLEAN, allowNull: false, },
    codigosupervisor: {type: DataTypes.STRING, allowNull: false, },
    codigodigitador: {type: DataTypes.STRING, allowNull: false, },
    kilosavance: {type: DataTypes.DOUBLE, allowNull: true, },
    linea: {type: DataTypes.INTEGER, allowNull: false, },
    idlabor: {type: DataTypes.INTEGER, allowNull: false, },
    idusuario: {type: DataTypes.INTEGER, allowNull: false, },
    idactividad: {type: DataTypes.INTEGER, allowNull: false, },

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Pre_Tarea_Esparrago_Grupo',
    freezeTableName: true,
    timestamps: false,
    tableName: 'PreTareaEsparragoGrupo'
  });
  return PreTareaEsparragoGrupo;
};