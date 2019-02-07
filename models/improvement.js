'use strict';
module.exports = (sequelize, DataTypes) => {
    const Improvement = sequelize.define('CI_Improvement', {
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
    Improvement.associate = function(models) {
        // A improvement can have many submissions
        Improvement.belongsToMany(models.CI_Submission, { through: 'ci_submission_improvement' });
    };
    return Improvement;
};