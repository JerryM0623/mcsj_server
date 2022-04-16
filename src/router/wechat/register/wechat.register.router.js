const Router = require('koa-router');

const registerController = require('../../../controller/wechat/register/register.controller')

const registerRouter = new Router({
    prefix: '/register'
})

// 注册账户
registerRouter.post('/register', registerController.register);

module.exports = registerRouter;