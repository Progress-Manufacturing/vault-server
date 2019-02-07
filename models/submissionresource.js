'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionResource = sequelize.define('Submissionresource', {
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
        resourceId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        tableName: 'ci_submission_resource'
    });
    return SubmissionResource;
};