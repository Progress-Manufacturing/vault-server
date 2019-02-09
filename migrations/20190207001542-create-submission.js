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
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            improvementExplanation: {
                type: Sequelize.STRING
            },
            proposedSolution: {
                type: Sequelize.STRING
            },
            resourceExplanation: {
                type: Sequelize.STRING
            },
            solutionMeasurement: {
                type: Sequelize.STRING
            },
            progressId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1
            },
            approvalId: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            leadId: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            rewardId: {
                type: Sequelize.INTEGER.UNSIGNED
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