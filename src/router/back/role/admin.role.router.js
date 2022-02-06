const Router = require('koa-router');
const adminRoleRouter = new Router({
    prefix: '/role'
})

const roleController = require('../../../controller/back/role/role.controller');

// 根据传递的数据分页查询数据
adminRoleRouter.get('/page',roleController.getByPageNum);
// 添加职位
adminRoleRouter.post('/add-role', roleController.addRole);
// 获取全部职位数据
adminRoleRouter.get('/all', roleController.getAllRole);

module.exports = adminRoleRouter;