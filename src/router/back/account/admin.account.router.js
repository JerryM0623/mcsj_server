const Router = require('koa-router');

const accountController = require('../../../controller/back/account/account.controller')

const adminAccountRouter = new Router({
    prefix:'/account'
});

// 分页查询数据
adminAccountRouter.get('/page', accountController.getAccountByPageNum);
// 创建新的账户
adminAccountRouter.post('/add-account', accountController.addAccount);

module.exports = adminAccountRouter;