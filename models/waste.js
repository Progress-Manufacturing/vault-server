'use strict';
module.exports = (sequelize, DataTypes) => {
    const Waste = sequelize.define('CI_Waste', {
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
    Waste.associate = function(models) {
        // A waste can have many submissions
        Waste.belongsToMany(models.CI_Submission, { through: 'ci_submission_waste' });
    };
    return Waste;
};