'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Labores_Cultivo_Packing extends Model {
    static associate(models) {
        Labores_Cultivo_Packing.belongsTo(models.Labor, {foreignKey: "idlabor",targetKey: 'idlabor'});
        Labores_Cultivo_Packing.belongsTo(models.Cultivo, {foreignKey: "idcultivo",targetKey: 'idcultivo'});
        Labores_Cultivo_Packing.belongsTo(models.Actividad, {foreignKey: "idactividad",targetKey: 'idactividad'});
        Labores_Cultivo_Packing.belongsTo(models.Presentacion_Linea, {foreignKey: "idpresentacion",targetKey: 'idpresentacion'});
    }
  };
  Labores_Cultivo_Packing.init({
    //add new parameters
    item: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false},
    idcultivo: {type: DataTypes.INTEGER, allowNull: false},
    idlabor: {type: DataTypes.INTEGER, allowNull: false},
    idactividad: {type: DataTypes.INTEGER, allowNull: false},
    fechamod: {type: DataTypes.DATE, allowNull: false},
    activo: {type: DataTypes.BOOLEAN, allowNull: false},
    idpresentacion: {type: DataTypes.INTEGER, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Labores_Cultivo_Packing',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Labores_Cultivo_Packing'
  });
  return Labores_Cultivo_Packing;
};