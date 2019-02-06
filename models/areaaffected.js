'use strict';
module.exports = (sequelize, DataTypes) => {
    const AreaAffected = sequelize.define('AreaAffected', {
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
    AreaAffected.associate = function(models) {
        // A area affected can have many submissions
        AreaAffected.belongsToMany(models.Submission, { through: 'ci_areas_affected' });
    };
    return AreaAffected;
};