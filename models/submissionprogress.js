'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionProgress = sequelize.define('Submissionprogress', {
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
    }, {
        tableName: 'ci_submission_progress'
    });
    return SubmissionProgress;
};