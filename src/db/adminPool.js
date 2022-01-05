const mysql = require('mysql2/promise');

const adminPool = mysql.createPool({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'root',
    database:'mcsj-admin',
    queueLimit:20, // 限制最多20条链接
})

module.exports = adminPool