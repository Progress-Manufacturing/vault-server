'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionReward = sequelize.define('Submissionreward', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        submissionId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        rewardId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        tableName: 'ci_submission_reward'
    });
    return SubmissionReward;
};