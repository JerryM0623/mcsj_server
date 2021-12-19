//  db.js
const mysql = require("mysql");

let pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    database: "doorandwindowvision",
    user: "root",
    password: "root",
});

function query(sql, callback) {
    // 获取数据库连接
    pool.getConnection((err, connection) => {
        // 运行sql命令
        connection.query(sql, (err, rows) => {
            callback(err, rows);
            connection.release();
        });

    });
}
exports.query = query;