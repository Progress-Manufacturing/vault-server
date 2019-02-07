'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubmissionWaste = sequelize.define('Submissionwaste', {
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
        wasteId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        tableName: 'ci_submission_waste'
    });
    return SubmissionWaste;
};