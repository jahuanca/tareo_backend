'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TipoTarea extends Model {
    static associate (models) {

    }
  };
  TipoTarea.init({
    // add new parameters
    idtipotarea: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    descripcion: { type: DataTypes.STRING(200), allowNull: true, validate: { notEmpty: true, len: [1, 200] } },

    accion: { type: DataTypes.VIRTUAL },
    usuario: { type: DataTypes.VIRTUAL },
    ip: { type: DataTypes.VIRTUAL },
    accion_usuario: { type: DataTypes.VIRTUAL }
  }, {
    sequelize,
    modelName: 'Tipo_Tarea',
    timestamps: false,
    freezeTableName: true,
    tableName: 'TipoTarea'
  })
  return TipoTarea
}
