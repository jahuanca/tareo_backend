'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pre_Tareo_Proceso_Uva extends Model {
    static associate(models) {
        //Pre_Tareo_Proceso_Uva.belongsTo(models.Usuario, {foreignKey: "idusuario",targetKey: 'idusuario'})
        /* Pre_Tareo_Proceso_Uva.belongsTo(models.Labores_Cultivo_Packing, {foreignKey: "item",targetKey: 'item'}); */
        Pre_Tareo_Proceso_Uva.belongsTo(models.Centro_Costo, {foreignKey: "idcentrocosto",targetKey: 'idcentrocosto'});
    }
  };
  Pre_Tareo_Proceso_Uva.init({
    //add new parameters
    itempretareaprocesouva: {primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    fecha: {type: DataTypes.DATEONLY, allowNull: false,},
    horainicio: {type: DataTypes.DATE, allowNull: false,},
    horafin: {type: DataTypes.DATE, allowNull: false,},
    pausainicio: {type: DataTypes.DATE, allowNull: false,},
    pausafin: {type: DataTypes.DATE, allowNull: false,},
    linea: {type: DataTypes.INTEGER, allowNull: false,},
    /* item: {type: DataTypes.INTEGER, allowNull: false,}, */
    idcentrocosto: {type: DataTypes.INTEGER, allowNull: false,},
    idcultivo: {type: DataTypes.INTEGER, allowNull: false,},
    diasiguiente: {type: DataTypes.BOOLEAN, allowNull: false,},
    turnotareo: {type: DataTypes.STRING, allowNull: false},
    idestado: {type: DataTypes.INTEGER, allowNull: false,},
    codigoempresasupervisor: {type: DataTypes.STRING, allowNull: false,},
    codigoempresadigitador: {type: DataTypes.STRING, allowNull: false,},
    /* fechamod: {type: DataTypes.DATE, allowNull: false,}, */
    /* activo: {type: DataTypes.BOOLEAN, allowNull: false,}, */
    idusuario: {type: DataTypes.INTEGER, allowNull: false,},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Pre_Tareo_Proceso_Uva',
    freezeTableName: true,
    timestamps: false,
    tableName: 'PreTareaProcesoUva'
  });
  return Pre_Tareo_Proceso_Uva;
};