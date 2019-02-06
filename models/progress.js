'use strict';
module.exports = (sequelize, DataTypes) => {
    const Progress = sequelize.define('Progress', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
          type: DataTypes.STRING,
          allowNull: false
      },
      step: {
          type: DataTypes.INTEGER,
          autoIncrement: false,
          allowNull: false
      }        
    });
    Progress.associate = function(models) {
        // A progress can have many submissions
        Progress.hasMany(models.Submission);
    };
    return Progress;
};