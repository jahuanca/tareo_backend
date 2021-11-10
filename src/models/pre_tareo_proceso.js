'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pre_Tareo_Proceso extends Model {
    static associate(models) {
        //Pre_Tareo_Proceso.belongsTo(models.Usuario, {foreignKey: "idusuario",targetKey: 'idusuario'})
        Pre_Tareo_Proceso.belongsTo(models.Labores_Cultivo_Packing, {foreignKey: "item",targetKey: 'item'});
        Pre_Tareo_Proceso.belongsTo(models.Centro_Costo, {foreignKey: "idcentrocosto",targetKey: 'idcentrocosto'});
    }
  };
  Pre_Tareo_Proceso.init({
    //add new parameters
    itempretareaproceso: {primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER},
    fecha: {type: DataTypes.DATEONLY, allowNull: false,},
    horainicio: {type: DataTypes.DATE, allowNull: false,},
    horafin: {type: DataTypes.DATE, allowNull: false,},
    pausainicio: {type: DataTypes.DATE, allowNull: false,},
    pausafin: {type: DataTypes.DATE, allowNull: false,},
    linea: {type: DataTypes.INTEGER, allowNull: false,},
    turnotareo: {type: DataTypes.STRING, allowNull: false},
    idcentrocosto: {type: DataTypes.INTEGER, allowNull: false,},
    diasiguiente: {type: DataTypes.BOOLEAN, allowNull: false,},
    codigoempresasupervisor: {type: DataTypes.STRING, allowNull: false,},
    codigoempresadigitador: {type: DataTypes.STRING, allowNull: false,},
    fechamod: {type: DataTypes.DATE, allowNull: false,},
    activo: {type: DataTypes.BOOLEAN, allowNull: false,},
    idusuario: {type: DataTypes.INTEGER, allowNull: false,},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Pre_Tareo_Proceso',
    freezeTableName: true,
    timestamps: false,
    tableName: 'PreTareoProceso'
  });
  return Pre_Tareo_Proceso;
};