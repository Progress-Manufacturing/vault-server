'use strict';
module.exports = (sequelize, DataTypes) => {
    const Resource = sequelize.define('Resource', {
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
    }, {
        tableName: 'ci_resources'
    });
    Resource.associate = function(models) {
        // A resource can have many submissions
        Resource.belongsToMany(models.Submission, { through: 'ci_submission_resource' });
        Resource.belongsToMany(models.LeadInfo, { through: 'ci_submission_lead_resource' });
    };
    return Resource;
};