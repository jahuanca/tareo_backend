'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PreTareoProcesoUva extends Model {
    static associate (models) {
      PreTareoProcesoUva.belongsTo(models.Centro_Costo, { foreignKey: 'idcentrocosto', targetKey: 'idcentrocosto' })
      PreTareoProcesoUva.belongsTo(models.Cultivo, { foreignKey: 'idcultivo', targetKey: 'idcultivo' })
      PreTareoProcesoUva.hasMany(models.Pre_Tareo_Proceso_Uva_Detalle, { foreignKey: 'itempretareaprocesouva', targetKey: 'itempretareaprocesouva' })
    }
  };
  PreTareoProcesoUva.init({
    itempretareaprocesouva: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    fecha: { type: DataTypes.DATE, allowNull: false },
    horainicio: { type: DataTypes.DATE, allowNull: false },
    horafin: { type: DataTypes.DATE, allowNull: false },
    pausainicio: { type: DataTypes.DATE, allowNull: true },
    pausafin: { type: DataTypes.DATE, allowNull: true },
    linea: { type: DataTypes.INTEGER, allowNull: false },
    idcentrocosto: { type: DataTypes.INTEGER, allowNull: false },
    idcultivo: { type: DataTypes.INTEGER, allowNull: false },
    diasiguiente: { type: DataTypes.BOOLEAN, allowNull: false },
    turnotareo: { type: DataTypes.STRING, allowNull: false },
    idestado: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
    codigoempresasupervisor: { type: DataTypes.STRING, allowNull: false },
    codigoempresadigitador: { type: DataTypes.STRING, allowNull: false },
    idusuario: { type: DataTypes.INTEGER, allowNull: false },
    estado: { type: DataTypes.STRING, allowNull: true, defaultValue: 'A' },

    accion: { type: DataTypes.VIRTUAL },
    usuario: { type: DataTypes.VIRTUAL },
    ip: { type: DataTypes.VIRTUAL },
    accion_usuario: { type: DataTypes.VIRTUAL }
  }, {
    sequelize,
    modelName: 'Pre_Tareo_Proceso_Uva',
    freezeTableName: true,
    timestamps: false,
    tableName: 'PreTareaProcesoUva'
  })
  return PreTareoProcesoUva
}
