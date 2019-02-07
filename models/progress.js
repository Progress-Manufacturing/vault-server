'use strict';
module.exports = (sequelize, DataTypes) => {
    const Progress = sequelize.define('Progress', {
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
    }, {
        tableName: 'ci_progress'
    });
    Progress.associate = function(models) {
        // A progress can have many submissions
        Progress.belongsToMany(models.Submission, { through: 'ci_submission_progress' });
    };
    return Progress;
};