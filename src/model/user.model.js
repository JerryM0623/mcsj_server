/**
 * 创建 t_users 表的模型
 */
const {DataTypes} = require('sequelize');
const sequelize = require('../db/seq');

const userModel = sequelize.define('t_user',{
    account:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        comment: '账号，唯一值'
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '密码'
    }
})

module.exports = userModel