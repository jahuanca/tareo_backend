'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Actividad extends Model {
    static associate (models) {
      Actividad.hasMany(models.Labor, { foreignKey: 'idactividad', targetKey: 'idactividad' })
    }
  };
  Actividad.init({
    // add new parameters
    idactividad: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false },
    actividad: { type: DataTypes.STRING(200), allowNull: false },
    descripcion: { type: DataTypes.STRING(200), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false },
    esrendimiento: { type: DataTypes.BOOLEAN, allowNull: false },
    esjornal: { type: DataTypes.BOOLEAN, allowNull: false },
    idsociedad: { type: DataTypes.INTEGER, allowNull: false },
    idusuario: { type: DataTypes.INTEGER, allowNull: false },
    fechamod: { type: DataTypes.DATE, allowNull: false },

    accion: { type: DataTypes.VIRTUAL },
    usuario: { type: DataTypes.VIRTUAL },
    ip: { type: DataTypes.VIRTUAL },
    accion_usuario: { type: DataTypes.VIRTUAL }
  }, {
    sequelize,
    modelName: 'Actividad',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Actividades'
  })
  return Actividad
}
