'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Labor extends Model {
    static associate(models) {
      Labor.belongsTo(models.Actividad, {foreignKey: "idactividad",targetKey: 'idactividad'})
    }
  };
  Labor.init({
    //add new parameters

    idlabor: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false},
    idactividad: {type: DataTypes.INTEGER, allowNull: false},
    labor: {type: DataTypes.STRING, allowNull: false},
    codigopresenta: {type: DataTypes.STRING, allowNull: true},
    descripcion: {type: DataTypes.STRING, allowNull: false},
    activo: {type: DataTypes.BOOLEAN, allowNull: false},
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    fechamod: {type: DataTypes.DATE, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Labor',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Labores'
  });
  return Labor;
};