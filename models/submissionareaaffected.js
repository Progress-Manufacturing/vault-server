'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionAreaAffected = sequelize.define('SubmissionAreaAffected', {
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
        areaAffectedId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    });
    return SubmissionAreaAffected;
};