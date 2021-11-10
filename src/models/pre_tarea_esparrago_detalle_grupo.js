
 'use strict';
 const {
   Model
 } = require('sequelize');
 module.exports = (sequelize, DataTypes) => {
   class PreTareaEsparragoDetalleGrupo extends Model {
     static associate(models) {
       
     }
   };
   PreTareaEsparragoDetalleGrupo.init({
     //add new parameters
     itempretareaesparragodetallegrupo: {primaryKey:true, autoIncrement: true, type: DataTypes.INTEGER, allowNull: false, },
     fecha: {type: DataTypes.DATEONLY, allowNull: false, },
     hora: {type: DataTypes.DATE, allowNull: false, },
     idestado: {type: DataTypes.INTEGER, allowNull: false, },
     itemprestareaesparragogrupo: {type: DataTypes.INTEGER, allowNull: false, },
     codigoempresa: {type: DataTypes.STRING, allowNull: false, },
     codigotk: {type: DataTypes.STRING, allowNull: false, },
     idusuario: {type: DataTypes.INTEGER, allowNull: false, },
 
     accion: {type: DataTypes.VIRTUAL},
     usuario: {type: DataTypes.VIRTUAL},
     ip: {type: DataTypes.VIRTUAL},
     accion_usuario: {type: DataTypes.VIRTUAL}
   }, {
     sequelize,
     modelName: 'Pre_Tarea_Esparrago_Detalle_Grupo',
     freezeTableName: true,
     timestamps: false,
     tableName: 'PreTareaEsparragoDetalleGrupo'
   });
   return PreTareaEsparragoDetalleGrupo;
 };