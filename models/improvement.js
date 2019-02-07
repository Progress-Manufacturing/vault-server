'use strict';
module.exports = (sequelize, DataTypes) => {
    const Improvement = sequelize.define('Improvement', {
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
        tableName: 'ci_improvements'
    });
    Improvement.associate = function(models) {
        // A improvement can have many submissions
        Improvement.belongsToMany(models.Submission, { through: 'ci_submission_improvement' });
    };
    return Improvement;
};