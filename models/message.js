'use strict';
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
          type: DataTypes.STRING
        },
        message:{
            type: DataTypes.TEXT('long'),
        }
    }, {
        tableName: 'ci_messages'
    });
    return Message;
};