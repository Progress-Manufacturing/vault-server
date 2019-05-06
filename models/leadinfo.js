'use strict';
module.exports = (sequelize, DataTypes) => {
    const LeadInfo = sequelize.define('LeadInfo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        submissionId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        },
        potentialStartDate: {
          type: DataTypes.DATE
        },
        potentialEndDate: {
          type: DataTypes.DATE
        },
        actualStartDate: {
          type: DataTypes.DATE
        },   
        actualEndDate: {
          type: DataTypes.DATE
        }
    }, {
        tableName: 'ci_submission_lead_info'
    });
    LeadInfo.associate = function(models) {
        // Lead information belongs to a user
        LeadInfo.belongsTo(models.User, {as: 'user'});
        // Lead information belongs one submission
        LeadInfo.belongsTo(models.Submission, {as: 'submission'});

    };
    return LeadInfo;
};