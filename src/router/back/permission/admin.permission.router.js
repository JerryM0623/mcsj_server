const Router = require('koa-router');
const adminPermissionRouter = new Router({
    prefix: '/permission'
})

const permissionController = require('../../../controller/back/permission/permission.controller')

// 获取权限信息的接口(分页形式)
adminPermissionRouter.get('/page', permissionController.getByPageNum);
// 添加一个新的权限信息
adminPermissionRouter.post('/add', permissionController.addPermission);
// 编辑一个权限信息
adminPermissionRouter.post('/edit', permissionController.editPermission);
// 删除权限信息
adminPermissionRouter.post('/delete', permissionController.deletePermission);
// 获取全部权限信息
adminPermissionRouter.get('/all', permissionController.getAllPermission);

module.exports = adminPermissionRouter