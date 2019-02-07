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
        admin: DataTypes.BOOLEAN,
        supervisor: DataTypes.BOOLEAN,
        lead: DataTypes.BOOLEAN,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        tableName: 'users'
    });
    User.associate = function(models) {
        // A user can have many submissions
        User.hasMany(models.Submission);
        // A user can have many rewards
        User.hasMany(models.Reward);
    };
    return User;
};