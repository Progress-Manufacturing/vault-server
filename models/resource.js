'use strict';
module.exports = (sequelize, DataTypes) => {
    const Resource = sequelize.define('CI_Resource', {
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
    Resource.associate = function(models) {
        // A resource can have many submissions
        Resource.belongsToMany(models.CI_Submission, { through: 'ci_submission_resource' });
    };
    return Resource;
};