'use strict';
module.exports = (sequelize, DataTypes) => {
    const Waste = sequelize.define('Waste', {
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
        tableName: 'ci_wastes'
    });
    Waste.associate = function(models) {
        // A waste can have many submissions
        Waste.belongsToMany(models.Submission, { through: 'ci_submission_waste' });
    };
    return Waste;
};