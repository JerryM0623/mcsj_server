const Koa = require('koa2');
const app = new Koa();

const router = require('./router/index');

const cors = require('koa-cors');

const path = require('path');
const koaStatic = require('koa-static');

const getIPAdressObj = require('./utils/getIPAddress')

// 启用 static 静态资源文件
app.use(koaStatic(path.join(__dirname + '/static')));
// 开启跨域
app.use(cors());
// 启用router中间件
app.use(router.routes(),router.allowedMethods());

// 监听端口
app.listen(4000,() => {
    console.log(`server is running at the http://${getIPAdressObj.getIPAddress()}:4000...`);
})