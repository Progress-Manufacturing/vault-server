'use strict';
module.exports = (sequelize, DataTypes) => {
    const AreasAffected = sequelize.define('AreasAffected', {
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
    AreasAffected.associate = function(models) {
        // A area affected can have to many submissions
        AreasAffected.belongsToMany(models.Post, { through: 'ci_areas_affected' });
    };
    return AreasAffected;
};