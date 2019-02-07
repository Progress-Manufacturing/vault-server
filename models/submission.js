'use strict';
module.exports = (sequelize, DataTypes) => {
    const Submission = sequelize.define('Submission', {
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
    }, {
        tableName: 'ci_submissions'
    });
    Submission.associate = function(models) {
        // A submission belongs to a user
        Submission.belongsTo(models.User);
        // A submission can belong to many areas
        Submission.belongsToMany(models.Area, { through: 'ci_submission_area' });
        // A submission can belong to many wastes
        Submission.belongsToMany(models.Waste, { through: 'ci_submission_waste' });
        // A submission can belong to many improvements
        Submission.belongsToMany(models.Improvement, { through: 'ci_submission_improvement' });
        // A submission can belong to many resources
        Submission.belongsToMany(models.Resource, { through: 'ci_submission_resource' });
        // A submission can belong to many comments
        Submission.belongsToMany(models.Comment, { through: 'ci_submission_comment' });
        // A submission can belongs one reward
        Submission.belongsTo(models.Reward);
        // A submission can belongs one approval
        Submission.belongsTo(models.Approval);
    };
    return Submission;
};