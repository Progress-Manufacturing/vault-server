'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        supervisor: DataTypes.INTEGER,
        isAdmin: DataTypes.BOOLEAN,
        isSupervisor: DataTypes.BOOLEAN
    }, {
        tableName: 'users'
    });
    User.associate = function(models) {
        // A user can have many submissions
        User.hasMany(models.Submission);
    };
    return User;
};