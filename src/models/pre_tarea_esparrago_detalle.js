
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreTareaEsparragoDetalle extends Model {
    static associate(models) {
      
    }
  };
  PreTareaEsparragoDetalle.init({
    //add new parameters
    itempretareaesparragodetalle: {primaryKey:true, autoIncrement: true, type: DataTypes.INTEGER, allowNull: false, },
    fecha: {type: DataTypes.DATEONLY, allowNull: false, },
    hora: {type: DataTypes.DATE, allowNull: false, },
    idestado: {type: DataTypes.INTEGER, allowNull: false, },
    itemprestareaesparragoformato: {type: DataTypes.INTEGER, allowNull: false, },
    codigoempresa: {type: DataTypes.STRING, allowNull: false, },
    codigotk: {type: DataTypes.STRING, allowNull: false, },
    correlativo: {type: DataTypes.INTEGER, allowNull: false, },
    idusuario: {type: DataTypes.INTEGER, allowNull: false, },
    idlabor: {type: DataTypes.INTEGER, allowNull: false, },
    idactividad: {type: DataTypes.INTEGER, allowNull: false, },

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Pre_Tarea_Esparrago_Detalle',
    freezeTableName: true,
    timestamps: false,
    tableName: 'PreTareaEsparragoDetalle'
  });
  return PreTareaEsparragoDetalle;
};
