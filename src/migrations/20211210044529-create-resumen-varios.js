'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Resumen_Varios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imei: { type: Sequelize.STRING(200), allowNull: true, },
      turno: { type: Sequelize.STRING, allowNull: true, },
      fecha: { type: Sequelize.DATEONLY, allowNull: true, },
      cantidad_cajas: { type: Sequelize.INTEGER, allowNull: true, },
      cantidad_personas: { type: Sequelize.INTEGER, allowNull: true, },
      idlabor: { type: Sequelize.INTEGER, allowNull: true, },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Resumen_Varios');
  }
};