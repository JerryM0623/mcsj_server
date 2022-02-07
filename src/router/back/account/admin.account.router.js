const Router = require('koa-router');

const accountController = require('../../../controller/back/account/account.controller')

const adminAccountRouter = new Router({
    prefix:'/account'
});

// 分页查询数据
adminAccountRouter.get('/page', accountController.getAccountByPageNum);
// 获取全部账户数据
adminAccountRouter.get('/all', accountController.getAllAccount);
// 创建新的账户
adminAccountRouter.post('/add-account', accountController.addAccount);
// 为账户赋予职位
adminAccountRouter.post('/set-account-role', accountController.setAccountRole);
// 删除账号及其职务
adminAccountRouter.post('/del', accountController.deleteAccount);
// 编辑一条权限信息
adminAccountRouter.post('/edit', accountController.edit);
// 删除账户信息
adminAccountRouter.post('/del-account-role', accountController.delAccountRole);

module.exports = adminAccountRouter;