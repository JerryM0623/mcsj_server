const Router = require('koa-router');

const loginMiddleware = require('../../../middleware/back/login.middleware');

const loginController = require('../../../controller/back/login/login.controller');

const loginRouter = new Router();

// 登录接口
loginRouter.post('/login', loginMiddleware.checkAccount, loginMiddleware.checkPassword, loginController.login);

module.exports = loginRouter;