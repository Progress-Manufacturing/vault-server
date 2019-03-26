'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ci_submission_lead_info', {
            id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false
            },
            submissionId: {
              type: Sequelize.INTEGER.UNSIGNED,
              unique: true,
              allowNull: false
            },
            userId: {
              type: Sequelize.INTEGER.UNSIGNED,
              allowNull: false
            },
            potentialStartDate: {
              type: Sequelize.DATE
            },
            potentialEndDate: {
              type: Sequelize.DATE
            },
            actualStartDate: {
              type: Sequelize.DATE
            },   
            actualEndDate: {
              type: Sequelize.DATE
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
        return queryInterface.dropTable('ci_submission_lead_info');
    }
};