/* admin 网页端的所有接口 */
const Router = require('koa-router');

const adminLoginRouter = require('./back/login/admin.login.router');
const adminAccountRouter = require('./back/account/admin.account.router');

const backRouter = new Router({
    prefix:'/admin'
})

// 配置登录接口
backRouter.use(adminLoginRouter.routes()).use(adminLoginRouter.allowedMethods());
// 配置账户管理接口
backRouter.use(adminAccountRouter.routes()).use(adminAccountRouter.allowedMethods());

module.exports = backRouter;