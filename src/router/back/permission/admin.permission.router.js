const Router = require('koa-router');
const adminPermissionRouter = new Router({
    prefix:'/permission'
})

const permissionController = require('../../../controller/back/permission/permission.controller')

// 获取权限信息的接口(分页形式)
adminPermissionRouter.get('/all', permissionController.getByPageNum);
// 添加(编辑)一个新的权限信息
// adminPermissionRouter.post('/submit', permissionController.submitPermission);
// 编辑已有权限信息
// adminPermissionRouter.post('/edit',permissionController.editPermission);
// 删除一条已有的权限信息
// adminPermissionRouter.post('/delete',permissionController.deletePermission);

module.exports = adminPermissionRouter