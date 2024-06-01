'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temp_Personal extends Model {
    static associate(models) {
      
    }
  };
  Temp_Personal.init({
    //add new parameters
    PERNR: {type: DataTypes.STRING, allowNull: true,},
    BUKRS: {type: DataTypes.STRING, allowNull: true,},
    ICTYP: {type: DataTypes.STRING, allowNull: true,},
    ICTXT: {type: DataTypes.STRING, allowNull: true,},
    ICNUM: {type: DataTypes.STRING, allowNull: true,},
    VORNA: {type: DataTypes.STRING, allowNull: true,},
    NACHN: {type: DataTypes.STRING, allowNull: true,},
    NACH2: {type: DataTypes.STRING, allowNull: true,},
    GBDAT: {type: DataTypes.DATE, allowNull: true,},
    SEXO: {type: DataTypes.STRING, allowNull: true,},
    ASIG_FAM: {type: DataTypes.STRING, allowNull: true,},
    FECHA_INGR: {type: DataTypes.DATE, allowNull: true,},
    CTTYP: {type: DataTypes.STRING, allowNull: true,},
    CTTXT: {type: DataTypes.STRING, allowNull: true,},
    FECHA_FCON: {type: DataTypes.DATE, allowNull: true,},
    FECHA_CESE: {type: DataTypes.DATE, allowNull: true,},
    ABKRS: {type: DataTypes.STRING, allowNull: true,},
    ABKTX: {type: DataTypes.STRING, allowNull: true,},
    PERSK: {type: DataTypes.STRING, allowNull: true,},
    PKTXT: {type: DataTypes.STRING, allowNull: true,},
    PLANS: {type: DataTypes.INTEGER, allowNull: true,},
    PLANS_TXT: {type: DataTypes.STRING, allowNull: true,},
    ORGEH: {type: DataTypes.INTEGER, allowNull: true,},
    ORGEH_TXT: {type: DataTypes.STRING, allowNull: true,},
    DIRECCION: {type: DataTypes.STRING, allowNull: true,},
    SCHKN: {type: DataTypes.STRING, allowNull: true,},
    RETEXT: {type: DataTypes.STRING, allowNull: true,},
    CAMPOADD1: {type: DataTypes.DATE, allowNull: true,},
    CAMPOADD2: {type: DataTypes.STRING, allowNull: true,},
    CAMPOADD3: {type: DataTypes.STRING, allowNull: true,},
    CAMPOADD4: {type: DataTypes.STRING, allowNull: true,},
    CAMPOADD5: {type: DataTypes.STRING, allowNull: true,},
    CAMPOADD6: {type: DataTypes.STRING, allowNull: true,},
    DESC_DEP: {type: DataTypes.STRING, allowNull: true,},
    DESC_AREA: {type: DataTypes.STRING, allowNull: true,},
    DESC_SECC: {type: DataTypes.STRING, allowNull: true,},
    FECHAMOD: {type: DataTypes.DATE, allowNull: true,},
    HORAMOD: {type: DataTypes.DATE, allowNull: true,},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Temp_Personal',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Temp_Personal'
  });
  return Temp_Personal;
};