/**
 * admin 后台管理系统的接口
 */
const Router = require('koa-router');
const controller = require('../controller/index')
const { userLoginValidate } = require('../middleware/user.middleware')
const { requestTokenValidate, checkRequestToken } = require('../middleware/token.middleware')

const backRouter = new Router({
    prefix: '/b'
});

// 登录接口
backRouter.post('/login', userLoginValidate, controller.backController.login);
// 获取用户详细信息
backRouter.get('/userinfo', requestTokenValidate, checkRequestToken, controller.backController.getUserInfo);

module.exports = backRouter;
