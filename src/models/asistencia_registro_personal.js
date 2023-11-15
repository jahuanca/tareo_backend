'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AsistenciaRegistroPersonal extends Model {
    static associate(models) {
      AsistenciaRegistroPersonal.belongsTo(models.Personal_Empresa, {foreignKey: 'codigoempresa', as: 'personal'})
    }
  };
  AsistenciaRegistroPersonal.init({
    //add new parameters
    idasistencia: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idasistenciaturno: {type: DataTypes.INTEGER, allowNull: false},
    codigoempresa: {type: DataTypes.STRING(8), allowNull: true, validate: {notEmpty: true, len: [1,8]}},
    tipomovimiento: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'I',
      validate: {notEmpty: true, len: [1,1], isIn: [['I', 'S']], isAlpha: true}
    },
    fechaentrada: {type: DataTypes.DATE, allowNull: false},
    horaentrada: {type: DataTypes.DATE, allowNull: false},
    idubicacionentrada: {type: DataTypes.INTEGER, allowNull: true},
    fechasalida: {type: DataTypes.DATE, allowNull: true},
    horasalida: {type: DataTypes.DATE, allowNull: true},
    idubicacionsalida: {type: DataTypes.INTEGER, allowNull: true},
    idturno: {type: DataTypes.INTEGER, allowNull: false},
    fechaturno: {type: DataTypes.DATE, allowNull: false},
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    fechamod: {type: DataTypes.DATE, allowNull: false},
    estado: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'AsistenciaRegistroPersonal',
    freezeTableName: true,
    tableName: 'Asistencia_RegistrosPersonal',
    timestamps: false
  });
  return AsistenciaRegistroPersonal;
};