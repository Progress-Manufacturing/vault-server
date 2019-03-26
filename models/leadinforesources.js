'use strict';
module.exports = (sequelize, DataTypes) => {
    const LeadResource = sequelize.define('Leadresource', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        leadInfoId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        resourceId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        tableName: 'ci_submission_lead_resource'
    });
    return LeadResource;
};