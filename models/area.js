'use strict';
module.exports = (sequelize, DataTypes) => {
    const Area = sequelize.define('CI_Area', {
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
    Area.associate = function(models) {
        // A area affected can have many submissions
        Area.belongsToMany(models.CI_Submission, { through: 'ci_submission_area' });
    };
    return Area;
};