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
    });
    Resource.associate = function(models) {
        // A resource can have to many submissions
        Resource.belongsToMany(models.Submission, { through: 'ci_resources' });
    };
    return Resource;
};