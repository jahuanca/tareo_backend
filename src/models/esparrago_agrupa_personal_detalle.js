'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EsparragoAgrupaPersonalDetalle extends Model {
    static associate(models) {
      EsparragoAgrupaPersonalDetalle.belongsTo(models.Personal_Empresa, {foreignKey: 'codigoempresa', as:'personal'}) 
    }
  };
  EsparragoAgrupaPersonalDetalle.init({
    //add new parameters
    itemagruparpersonaldetalle: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    itemagruparpersonal: {type: DataTypes.INTEGER, allowNull: false},
    codigoempresa: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    fechamod: {type: DataTypes.DATE, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    idusuario: {type: DataTypes.INTEGER, allowNull: true},
    linea: {type: DataTypes.INTEGER, allowNull: true},
    grupo: {type: DataTypes.INTEGER, allowNull: true},
    turno: {type: DataTypes.STRING(1), allowNull: true, 
      validate: {notEmpty: true, len: [1,1], isIn: [['D', 'N']], isAlpha: true}
    },
    estado: {type: DataTypes.STRING(1), allowNull: true, 
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },
    fecha: {type: DataTypes.DATEONLY, allowNull: true},
    idestado: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 1},
    documento: {type: DataTypes.STRING(12), allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'EsparragoAgrupaPersonalDetalle',
    freezeTableName: true,
    tableName: 'EsparragoAgrupaPersonalDetalle',
    timestamps: false
  });
  return EsparragoAgrupaPersonalDetalle;
};