'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ci_progress', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
      },
      step: {
          type: Sequelize.INTEGER,
          autoIncrement: false,
      },
      description: {
          type: Sequelize.STRING,
      },
      createdAt: {
          type: Sequelize.DATE,
          allowNull: false
      },
      updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ci_progress');
  }
};