'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
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
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commentType: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        tableName: 'ci_comments'
    });
    Comment.associate = function(models) {
        // A comment belongs to a user
        Comment.belongsTo(models.User);
        // A comment belongs to a submission
        Comment.belongsTo(models.Submission);
    };
    return Comment;
};