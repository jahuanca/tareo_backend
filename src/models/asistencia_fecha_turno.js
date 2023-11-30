'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AsistenciaFechaTurno extends Model {
    static associate(models) {
      AsistenciaFechaTurno.belongsTo(models.Turno, {foreignKey: 'idturno', as: 'Turno'})
      AsistenciaFechaTurno.belongsTo(models.AsistenciaUbicacion, {foreignKey: 'idubicacion', as: 'Ubicacion'})
      AsistenciaFechaTurno.hasMany(models.AsistenciaRegistroPersonal, {foreignKey: 'idasistenciaturno', as: 'registros'})
    }
  };
  AsistenciaFechaTurno.init({
    //add new parameters
    idasistenciaturno: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fecha: {type: DataTypes.DATEONLY, allowNull: true},
    idubicacion: {type: DataTypes.INTEGER, allowNull: true},
    idturno: {type: DataTypes.INTEGER, allowNull: true},
    idestado: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 1},
    ipmovil: {type: DataTypes.STRING(50), allowNull: true, validate: {notEmpty: true, len: [1,50]}},
    fechamod: {type: DataTypes.DATE, allowNull: true},
    idusuario: {type: DataTypes.INTEGER, allowNull: true},
    estado: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['P', 'M' ,'A', 'I']], isAlpha: true}
    },
    //firmasupervisor: {type: DataTypes.STRING(200), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'AsistenciaFechaTurno',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Asistencia_FechaxTurno'
  });
  return AsistenciaFechaTurno;
};
