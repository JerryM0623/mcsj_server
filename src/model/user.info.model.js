/**
 * 创建 t_users_infos 表的模型
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../db/seq');

const userInfoModel = sequelize.define('t_users_info',{
    user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        comment: '用户id'
    },
    user_avatar:{
        type: DataTypes.STRING,
        allowNull:false,
        comment: '用户头像存储链接'
    }
})

module.exports = userInfoModel