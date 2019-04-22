'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                unique: true,
                primaryKey: true,
                allowNull: false
            },
            admin: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },        
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            secondaryEmail: {
                type: Sequelize.STRING
            },
            oid: {
                type: Sequelize.STRING,
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