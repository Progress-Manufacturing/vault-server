'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionReward = sequelize.define('CI_SubmissionReward', {
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
    });
    return SubmissionReward;
};