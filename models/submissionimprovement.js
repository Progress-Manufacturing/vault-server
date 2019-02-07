'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionImprovement = sequelize.define('Submissionimprovement', {
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
        improvementId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        tableName: 'ci_submission_improvement'
    });
    return SubmissionImprovement;
};