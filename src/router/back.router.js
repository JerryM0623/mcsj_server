/* admin 网页端的所有接口 */
const Router = require('koa-router');

const loginMiddleware = require('../middleware/back/login.middleware')

const loginController = require('../controller/back/login.controller')

const backRouter = new Router({
    prefix:'/admin'
})

// 登录接口
backRouter.post('/login', loginMiddleware.checkAccount, loginMiddleware.checkPassword, loginController.login);

module.exports = backRouter;