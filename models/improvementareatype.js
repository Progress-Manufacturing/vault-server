'use strict';
module.exports = (sequelize, DataTypes) => {
    const ImprovementAreaType = sequelize.define('ImprovementAreaType', {
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
        tableName: 'ci_improvement_area_type'
    });
    return ImprovementAreaType;
};