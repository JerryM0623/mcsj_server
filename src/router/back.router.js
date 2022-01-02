/**
 * admin 后台管理系统的接口
 */
const Router = require('koa-router');
const controller = require('../controller/index')

const backRouter = new Router({
    prefix: '/b'
});

// 登录接口
backRouter.post('/login', controller.backController.login);

module.exports = backRouter;
