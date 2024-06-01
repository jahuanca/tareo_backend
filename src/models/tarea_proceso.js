'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TareaProceso extends Model {
    static associate (models) {}
  };
  TareaProceso.init({
    // add new parameters
    itemtareoproceso: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    codigoempresasupervisor: { type: DataTypes.STRING, allowNull: false },
    codigoempresadigitador: { type: DataTypes.STRING, allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    idactividad: { type: DataTypes.INTEGER, allowNull: false },
    idlabor: { type: DataTypes.INTEGER, allowNull: false },
    idcentrocosto: { type: DataTypes.INTEGER, allowNull: false },
    turnotareo: { type: DataTypes.STRING, allowNull: false },
    fechamod: { type: DataTypes.DATE, allowNull: false },
    idusuario: { type: DataTypes.INTEGER, allowNull: false },
    idestado: { type: DataTypes.INTEGER, allowNull: false },
    escampo: { type: DataTypes.BOOLEAN, allowNull: false },
    espacking: { type: DataTypes.BOOLEAN, allowNull: false },
    esjornal: { type: DataTypes.BOOLEAN, allowNull: false },
    esrendimiento: { type: DataTypes.BOOLEAN, allowNull: false },
    horainicio: { type: DataTypes.DATE, allowNull: false },
    horafin: { type: DataTypes.DATE, allowNull: false },
    pausainicio: { type: DataTypes.DATE, allowNull: true },
    pausafin: { type: DataTypes.DATE, allowNull: true },
    diasiguiente: { type: DataTypes.BOOLEAN, allowNull: false },
    firmasupervisor: { type: DataTypes.STRING, allowNull: true },

    accion: { type: DataTypes.VIRTUAL },
    usuario: { type: DataTypes.VIRTUAL },
    ip: { type: DataTypes.VIRTUAL },
    accion_usuario: { type: DataTypes.VIRTUAL }
  }, {
    sequelize,
    modelName: 'TareaProceso',
    freezeTableName: true,
    timestamps: false,
    tableName: 'TareoProceso'
  })

  TareaProceso.associate = function (models) {
    TareaProceso.belongsTo(models.Centro_Costo, { foreignKey: 'idcentrocosto', targetKey: 'idcentrocosto' })
    TareaProceso.belongsTo(models.Labor, { foreignKey: 'idlabor', targetKey: 'idlabor' })
    TareaProceso.belongsTo(models.Actividad, { foreignKey: 'idactividad', targetKey: 'idactividad' })
    TareaProceso.belongsTo(models.Personal_Empresa, { foreignKey: 'codigoempresasupervisor', targetKey: 'codigoempresa', as: 'Supervisor' })
    TareaProceso.belongsTo(models.Personal_Empresa, { foreignKey: 'codigoempresasupervisor', targetKey: 'codigoempresa', as: 'Digitador' })
    /* TareaProceso.belongsTo(models.Personal_Empresa, {foreignKey: "codigoempresa",targetKey: 'codigoempresa'}) */
  }

  return TareaProceso
}
