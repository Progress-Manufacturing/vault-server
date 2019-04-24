'use strict';
module.exports = (sequelize, DataTypes) => {
    const LeadProgress = sequelize.define('LeadProgress', {
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
        submissionId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        },
        progressId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        }
    }, {
        tableName: 'ci_lead_progress'
    });
    LeadProgress.associate = function(models) {
        // A comment belongs to a user
        LeadProgress.belongsTo(models.User);
        // A comment belongs to a submission
        LeadProgress.belongsTo(models.Submission);
    };
    return LeadProgress;
};