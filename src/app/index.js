const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors')

const router = require('../router/index');

const app = new Koa();
// 注册跨域
app.use(cors({
    origin: function(ctx) {return ctx.header.origin;},
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', "OPTIONS"],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// 注册 body 解析中间件
app.use(koaBody());
// 注册所有的路由中间件
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;