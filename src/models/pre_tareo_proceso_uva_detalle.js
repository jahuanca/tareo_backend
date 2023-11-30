'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pre_Tareo_Proceso_Uva_Detalle extends Model {
    static associate(models) {
      Pre_Tareo_Proceso_Uva_Detalle.belongsTo(models.Pre_Tareo_Proceso_Uva, {foreignKey: 'itempretareoprocesouvadetalle'});
      Pre_Tareo_Proceso_Uva_Detalle.belongsTo(models.Labor, {foreignKey: 'idlabor'});
      Pre_Tareo_Proceso_Uva_Detalle.belongsTo(models.Pre_Tareo_Proceso_Uva, {foreignKey: 'itempretareaprocesouva'});
      Pre_Tareo_Proceso_Uva_Detalle.belongsTo(models.Actividad, {foreignKey: 'idactividad'});
    }
  };
  Pre_Tareo_Proceso_Uva_Detalle.init({
    //add new parameters
    itempretareoprocesouvadetalle: {primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER},
    codigoempresa: {type: DataTypes.STRING, allowNull: false,},
    itempretareaprocesouva: {type: DataTypes.INTEGER, allowNull: false,},
    numcaja: {type: DataTypes.INTEGER, allowNull: false,},
    fecha: {type: DataTypes.DATEONLY, allowNull: false,},
    hora: {type: DataTypes.DATE, allowNull: false,},
    imei: {type: DataTypes.STRING, allowNull: false,},
    idusuario: {type: DataTypes.INTEGER, allowNull: false,},
    idlabor: {type: DataTypes.INTEGER, allowNull: false,},
    idactividad: {type: DataTypes.INTEGER, allowNull: false,},
    idpresentacion: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    idestado: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 1},
    codigotk: {type: DataTypes.STRING, allowNull: true,},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Pre_Tareo_Proceso_Uva_Detalle',
    freezeTableName: true,
    timestamps: false,
    tableName: 'PreTareaProcesoUvaDetalle'
  });
  return Pre_Tareo_Proceso_Uva_Detalle;
};