'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING
            },
            admin: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            supervisor: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            lead: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
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
        return queryInterface.dropTable('users');
    }
};