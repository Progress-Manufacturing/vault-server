'use strict';
module.exports = (sequelize, DataTypes) => {
    const Wastes = sequelize.define('Wastes', {
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
    Wastes.associate = function(models) {
        // A waste can have to many submissions
        Wastes.belongsToMany(models.Post, { through: 'ci_wastes' });
    };
    return Wastes;
};