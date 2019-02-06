'use strict';
module.exports = (sequelize, DataTypes) => {
    const Processes = sequelize.define('Processes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        description: DataTypes.STRING
    });
    Processes.associate = function(models) {
        // A process can have to many submissions
        Processes.belongsToMany(models.Post, { through: 'ci_processes' });
    };
    return Processes;
};