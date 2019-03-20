'use strict';
module.exports = (sequelize, DataTypes) => {
    const Submission = sequelize.define('Submission', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        improvementExplanation: {
            type: DataTypes.TEXT('long'),
        },
        proposedSolution: {
            type: DataTypes.TEXT('long'),
        },
        resourceExplanation: {
            type: DataTypes.TEXT('long'),
        },
        solutionMeasurement: {
            type: DataTypes.TEXT('long'),
        },
        improvementAreaTypeId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        progressId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1
        },
        approvalId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        lead: {
            type: DataTypes.STRING
        },
        supervisor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rewardId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
    }, {
        tableName: 'ci_submissions'
    });
    Submission.associate = function(models) {
        // A submission belongs to a user
        Submission.belongsTo(models.User, {as: 'user'});
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
        // A submission belongs one progress
        Submission.belongsTo(models.Progress, {as: 'progress'});
        // A submission belongs one approval
        Submission.belongsTo(models.Approval, {as: 'approval'});
        // A submission belongs one supervisor approval
        Submission.belongsTo(models.SupApproval, {as: 'supapproval'});
        // A submission belongs one reward
        Submission.belongsTo(models.Reward, {as: 'reward'});

        Submission.belongsTo(models.ImprovementAreaType, {as: 'improvement_area_type'});
    };
    return Submission;
};