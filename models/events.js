'use strict';
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
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
        tableName: 'ci_events'
    });
    Event.associate = function(models) {
        // A comment belongs to a user
        Event.belongsTo(models.User);
        // A comment belongs to a submission
        Event.belongsTo(models.Submission);
    };
    return Event;
};
