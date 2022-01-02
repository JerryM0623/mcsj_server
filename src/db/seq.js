const {Sequelize} = require('sequelize');
const {MYSQL_HOST, MYSQL_USER, MYSQL_PASS, DATABASE_NAME, DATABASE_TYPE} = require('../config/config.default')
// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize(DATABASE_NAME, MYSQL_USER, MYSQL_PASS, {
    host: MYSQL_HOST,
    dialect: DATABASE_TYPE,
});

// sequelize.authenticate().then(() => {
//     console.log('数据库连接成功');
// }).catch(err => {
//     console.log('数据库连接失败',err);
// })

module.exports = sequelize;