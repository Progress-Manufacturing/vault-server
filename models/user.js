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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        oid: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'users'
    });
    User.associate = function(models) {
        // A user can have many submissions
        User.hasMany(models.Submission);
    };
    return User;
};