'use strict';
module.exports = (sequelize, DataTypes) => {
    const Process = sequelize.define('Process', {
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
    Process.associate = function(models) {
        // A process can have to many submissions
        Process.belongsToMany(models.Submission, { through: 'ci_processes' });
    };
    return Process;
};