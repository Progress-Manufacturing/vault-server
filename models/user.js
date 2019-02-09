'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
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