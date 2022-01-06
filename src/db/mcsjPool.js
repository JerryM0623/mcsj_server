const mysql = require('mysql2/promise');

const { MYSQL_USER, MYSQL_PASS, MYSQL_HOST, MYSQL_PORT, DATABASE_MCSJ } = require('../config/app.config')

const mcsjPool = mysql.createPool({
    host: MYSQL_HOST,
    port:MYSQL_PORT,
    user:MYSQL_USER,
    password:MYSQL_PASS,
    database:DATABASE_MCSJ,
    queueLimit:20, // 限制最多20条链接
})

module.exports = mcsjPool;