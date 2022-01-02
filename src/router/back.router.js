/**
 * admin 后台管理系统的接口
 * @type {any}
 */
const Router = require('koa-router');

const backRouter = new Router();

backRouter.get('/b/login',(ctx) => {
    ctx.body = 'hello back login!';
})

module.exports = backRouter;
