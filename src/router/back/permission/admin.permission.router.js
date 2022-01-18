const Router = require('koa-router');
const adminPermissionRouter = new Router({
    prefix:'/permission'
})

const permissionController = require('../../../controller/back/permission/permission.controller')

// 获取权限信息的接口
adminPermissionRouter.get('/all', permissionController.getAll);
// 添加一个新的权限信息
adminPermissionRouter.post('/add', permissionController.addPermission);
// 编辑已有权限信息
adminPermissionRouter.post('/edit',permissionController.editPermission);

module.exports = adminPermissionRouter