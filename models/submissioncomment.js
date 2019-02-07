'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionComment = sequelize.define('CI_SubmissionComment', {
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
        commentId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    });
    return SubmissionComment;
};