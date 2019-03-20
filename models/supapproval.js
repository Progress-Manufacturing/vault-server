'use strict';
module.exports = (sequelize, DataTypes) => {
    const SupApproval = sequelize.define('SupApproval', {
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
    },{
        tableName: "ci_supervisor_approvals"
    });
    SupApproval.associate = function(models) {
        // A supervisor approval can have many submissions
        SupApproval.hasMany(models.Submission);
    };
    return SupApproval;
};
