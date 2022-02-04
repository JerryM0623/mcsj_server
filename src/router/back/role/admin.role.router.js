const Router = require('koa-router');
const adminRoleRouter = new Router({
    prefix: '/role'
})

const roleController = require('../../../controller/back/role/role.controller');

// 根据传递的数据分页查询数据
adminRoleRouter.get('/all',roleController.getByPageNum);

module.exports = adminRoleRouter;