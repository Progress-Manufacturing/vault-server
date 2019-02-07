'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionProgress = sequelize.define('CI_SubmissionProgress', {
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
        progressId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    });
    return SubmissionProgress;
};