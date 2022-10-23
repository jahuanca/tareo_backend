'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Resumen_Varios_Esparrago', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: { type: Sequelize.DATEONLY, allowNull: true, },
      imei: { type: Sequelize.STRING(200), allowNull: true, },
      idcliente: { type: Sequelize.INTEGER, allowNull: true, },
      idlabor: { type: Sequelize.INTEGER, allowNull: true, },
      mesa: { type: Sequelize.STRING, allowNull: true, },
      linea: { type: Sequelize.STRING, allowNull: true, },
      
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
    return queryInterface.dropTable('Resumen_Varios_Esparrago');
  }
};