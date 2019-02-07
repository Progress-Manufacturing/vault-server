'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionArea = sequelize.define('Submissionarea', {
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
        areaId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        tableName: 'ci_submission_area'
    });
    return SubmissionArea;
};