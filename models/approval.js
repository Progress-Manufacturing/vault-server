'use strict';
module.exports = (sequelize, DataTypes) => {
    const Approval = sequelize.define('CI_Approval', {
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
        description: DataTypes.STRING
    });
    Approval.associate = function(models) {
        // A approval can have many submissions
        Approval.belongsToMany(models.CI_Submission, { through: 'ci_submission_approval' });
    };
    return Approval;
};