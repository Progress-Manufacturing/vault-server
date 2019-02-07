'use strict';
module.exports = (sequelize, DataTypes) => {
    const Progress = sequelize.define('CI_Progress', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        step: {
            type: DataTypes.INTEGER,
            autoIncrement: false
        },
        description: DataTypes.STRING
    });
    Progress.associate = function(models) {
        // A progress can have many submissions
        Progress.belongsToMany(models.CI_Submission, { through: 'ci_submission_progress' });
    };
    return Progress;
};