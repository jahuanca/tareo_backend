
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal_Empresa extends Model {
    static associate(models) {
      
    }
  };
  Personal_Empresa.init({
    //add new parameters
    codigoempresa: {type: DataTypes.STRING(200), primaryKey: true, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    apellidopaterno: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    apellidomaterno: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    nombres: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    nrodocumento: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    fechamod: {type: DataTypes.DATE, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    idtipodocumento: {type: DataTypes.INTEGER, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    fechaingreso: {type: DataTypes.DATE, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    bloqueado: {type: DataTypes.BOOLEAN, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    fechacese: {type: DataTypes.DATE, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    idusuario: {type: DataTypes.INTEGER, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    itemgrupopersonal: {type: DataTypes.INTEGER, allowNull: false},
    areanomina: {type: DataTypes.STRING(20), allowNull: true, validate: {notEmpty: true, len: [1,20]}},
    subdivision: {type: DataTypes.STRING(20), allowNull: true, validate: {notEmpty: true, len: [1,20]}},
    idareanomina: {type: DataTypes.INTEGER, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    idsubdivision: {type: DataTypes.INTEGER, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    posicion: {type: DataTypes.STRING(20), allowNull: true, validate: {notEmpty: true, len: [1,20]}},
    cargo: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Personal_Empresa',
    freezeTableName: true,
    timestamps: false,
    tableName: 'personalempresa'
  });

  Personal_Empresa.associate = function(models) {
    Personal_Empresa.hasMany(models.PersonalEmpresa_Subdivision, {foreignKey: "codigoempresa",targetKey: 'codigoempresa'})
  };

  return Personal_Empresa;
};