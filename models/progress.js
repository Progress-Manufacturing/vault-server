'use strict';
module.exports = (sequelize, DataTypes) => {
    const Progress = sequelize.define('Progress', {
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
        step: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            autoIncrement: false
        },
        description: DataTypes.STRING
    }, {
        tableName: 'ci_progress'
    });
    // Progress.associate = function(models) {
    //     A progress can have many submissions
    //     Progress.hasMany(models.Submission);        
    // };
    return Progress;
};