const Router = require('koa-router');

const accountController = require('../../../controller/back/account/account.controller')

const adminAccountRouter = new Router({
    prefix:'/account'
});

// 分页查询数据
adminAccountRouter.get('/page', accountController.getAccountByPageNum);

module.exports = adminAccountRouter;