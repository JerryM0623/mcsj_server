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

// 全部用户数据
backRouter.get('/accounts', requestTokenValidate, checkRequestToken, controller.backController.getAllAccountInfo);

// 根据 id 查询账号信息（查到的绝对是单一数据）
backRouter.get('/account/id', requestTokenValidate, checkRequestToken, controller.backController.getAccountInfoById);

// 根据 account 查询账号信息（查到的绝对是单一数据）
backRouter.get('/account/account', requestTokenValidate, checkRequestToken, controller.backController.getAccountInfoByAccount);

// 根据 role 查询对应的账户信息（查到的数据可以是多数的）
backRouter.get('/accounts/role', requestTokenValidate, checkRequestToken, controller.backController.getAccountsInfoByRole);

module.exports = backRouter;
