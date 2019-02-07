'use strict';
module.exports = (sequelize, DataTypes) => {
    const Submission = sequelize.define('CI_Submission', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        supervisorId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        leadId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        improvementExplanation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        proposedSolution: {
            type: DataTypes.STRING,
            allowNull: true
        },
        resourceExplanation: {
            type: DataTypes.STRING,
            allowNull: true              
        },
        solutionMeasurement: {
            type: DataTypes.STRING,
            allowNull: true        
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    Submission.associate = function(models) {
        // A submission belongs to a user
        Submission.belongsTo(models.User);
        // A submission can belong to many areas
        Submission.belongsToMany(models.CI_Area, { through: 'ci_submission_area' });
        // A submission can belong to many wastes
        Submission.belongsToMany(models.CI_Waste, { through: 'ci_submission_waste' });
        // A submission can belong to many improvements
        Submission.belongsToMany(models.CI_Improvement, { through: 'ci_submission_improvement' });
        // A submission can belong to many resources
        Submission.belongsToMany(models.CI_Resource, { through: 'ci_submission_resource' });
        // A submission can belong to many comments
        Submission.belongsToMany(models.CI_Comment, { through: 'ci_submission_comment' });
        // A submission can belongs one reward
        Submission.belongsTo(models.CI_Reward);
        // A submission can belongs one approval
        Submission.belongsTo(models.CI_Approval);
    };
    return Submission;
};