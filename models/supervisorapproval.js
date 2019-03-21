'use strict';
module.exports = (sequelize, DataTypes) => {
    const SupervisorApproval = sequelize.define('SupervisorApproval', {
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
        tableName: 'ci_supervisor_approvals'
    });
    return SupervisorApproval;
};