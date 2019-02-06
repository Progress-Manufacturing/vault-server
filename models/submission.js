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
        resourcesExplanation: {
            type: DataTypes.STRING,
            allowNull: true              
        },
        solutionMeasurement: {
            type: DataTypes.STRING,
            allowNull: true        
        },
        reward: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true
        },
        progress: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
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
        // A submission can belong to many comments
        Submission.belongsToMany(models.Comment, { through: 'ci_comments' });
        // A submission can belong to many areas affected
        Submission.belongsToMany(models.AreasAffected, { through: 'ci_areas_affected' });
        // A submission can belong to many wastes
        Submission.belongsToMany(models.WastesSeen, { through: 'ci_wastes' });
        // A submission can belong to many process
        Submission.belongsToMany(models.ProcessImproved, { through: 'ci_processes' });
        // A submission can belong to many resources
        Submission.belongsToMany(models.ResourcesNeeded, { through: 'ci_resources' });
        // A submission can belong to many resources
        Submission.belongsToMany(models.ResourcesNeeded, { through: 'ci_resources' });
    };
    return Submission;
};