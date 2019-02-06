'use strict';
module.exports = (sequelize, DataTypes) => {
    const Progress = sequelize.define('Progress', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      description: {
          type: Sequelize.STRING,
          allowNull: false
      },
      step: {
          type: Sequelize.INTEGER,
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