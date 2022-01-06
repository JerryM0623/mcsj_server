const Router = require('koa-router');

const tokenMiddleWare = require('../../middleware/back/token.middleware')
const loginMiddleware = require('../../middleware/back/login.middleware')

const accountController = require('../../controller/back/account.controller')

const adminAccountRouter = new Router({
    prefix:'/account'
});

// 获取全部账户数据
adminAccountRouter.get('/all', tokenMiddleWare.checkToken, accountController.getAllAccount);
// 添加一个账户信息
adminAccountRouter.post('/add', tokenMiddleWare.checkToken, loginMiddleware.checkAccount, loginMiddleware.checkPassword, accountController.addAccount);
// 更新一个账户信息
adminAccountRouter.post('/update', tokenMiddleWare.checkToken, loginMiddleware.checkAccount, loginMiddleware.checkPassword, accountController.updateAccount);
// 删除一个账户信息
adminAccountRouter.post('/delete', tokenMiddleWare.checkToken, accountController.deleteAccount);

module.exports = adminAccountRouter;