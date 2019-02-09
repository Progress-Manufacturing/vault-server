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
            unique: true,
            allowNull: false
        },
        description: DataTypes.STRING
    }, {
        tableName: 'ci_rewards'
    });
    // Reward.associate = function(models) {
    //     // A reward can have many submissions
    //     Reward.belongsToMany(models.Submission, { through: 'ci_submission_reward' });
    // };
    return Reward;
};