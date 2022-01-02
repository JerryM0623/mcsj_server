const dotenv = require('dotenv');

// 将 .env 文件里面的配置数据引入 process.env 中
dotenv.config();

// 到处 process.env
module.exports = process.env;