'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionApproval = sequelize.define('CI_SubmissionApproval', {
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
    });
    return SubmissionApproval;
};