'use strict';
module.exports = (sequelize, DataTypes) => {
    const Resources = sequelize.define('Resources', {
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
    Resources.associate = function(models) {
        // A resource can have to many submissions
        Resources.belongsToMany(models.Post, { through: 'ci_resources' });
    };
    return Resources;
};