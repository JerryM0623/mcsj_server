const Koa = require('koa');
const router = require('../router/index');
const koaBody = require('koa-body');

const app = new Koa();

// 注册 body 解析中间件
app.use(koaBody());
// 注册所有的路由中间件
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;