const Router = require('koa-router');

const loginController = require('../../../controller/wechat/login/login.controller');

const loginRouter = new Router({
    prefix: '/login'
})

// 登录账户
loginRouter.post('/login', loginController.login);

module.exports = loginRouter;