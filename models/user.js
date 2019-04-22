'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        admin: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        secondaryEmail: {
            type: DataTypes.STRING,
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