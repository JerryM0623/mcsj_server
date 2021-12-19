// 使用db进行sql操作
const db = require("../utils/db");

async function packet(sql) {
    // 该函数必须要返回一个 Promise
    const res = await new Promise((resolve, reject) => {
        return db.query(sql, (err, data) => {
            err && reject(err);
            resolve(data);
        });
    });
    return res;
}

exports.packet = packet;