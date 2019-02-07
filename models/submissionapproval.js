'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionApproval = sequelize.define('Submissionapproval', {
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
        approvalId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        tableName: 'ci_submission_approval'
    });
    return SubmissionApproval;
};