'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ci_submissions', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            supervisorId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true
            },
            leadId: {
              type: Sequelize.INTEGER.UNSIGNED,
              allowsNull: true
            },
            rewardId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            improvementExplanation: {
                type: Sequelize.STRING,
                allowNull: true
            },
            proposedSolution: {
                type: Sequelize.STRING,
                allowNull: true
            },
            resourceExplanation: {
                type: Sequelize.STRING,
                allowNull: true              
            },
            solutionMeasurement: {
                type: Sequelize.STRING,
                allowNull: true        
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
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
        return queryInterface.dropTable('ci_submissions');
    }
};