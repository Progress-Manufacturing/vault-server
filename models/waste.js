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
    });
    Waste.associate = function(models) {
        // A waste can have to many submissions
        Waste.belongsToMany(models.Submission, { through: 'ci_wastes' });
    };
    return Waste;
};