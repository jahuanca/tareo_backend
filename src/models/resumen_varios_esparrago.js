'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resumen_Varios_Esparrago extends Model {
    static associate(models) {}
  };
  Resumen_Varios_Esparrago.init({
    //add new parameters
    fecha: { type: DataTypes.DATEONLY, allowNull: true, },
    imei: { type: DataTypes.STRING(200), allowNull: true, },
    idcliente: { type: DataTypes.INTEGER, allowNull: true, },
    idlabor: { type: DataTypes.INTEGER, allowNull: true, },
    mesa: { type: DataTypes.STRING, allowNull: true, },
    cantidad: { type: DataTypes.INTEGER, allowNull: true, },
    linea: { type: DataTypes.STRING, allowNull: true, },

    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now },
    updatedAt: { type: DataTypes.DATE, allowNull: true },

    accion: { type: DataTypes.VIRTUAL },
    usuario: { type: DataTypes.VIRTUAL },
    ip: { type: DataTypes.VIRTUAL },
    accion_usuario: { type: DataTypes.VIRTUAL }
  }, {
    sequelize,
    modelName: 'Resumen_Varios_Esparrago',
    freezeTableName: true,
    tableName: 'Resumen_Varios_Esparrago'
  });
  return Resumen_Varios_Esparrago;
};