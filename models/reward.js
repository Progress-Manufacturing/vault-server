'use strict';
module.exports = (sequelize, DataTypes) => {
    const Reward = sequelize.define('Reward', {
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
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Reward.associate = function(models) {
        // A Reward can have many submissions
        Reward.hasMany(models.Submission);
    };
    return Reward;
};