'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionImprovement = sequelize.define('CI_SubmissionImprovement', {
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
    });
    return SubmissionImprovement;
};