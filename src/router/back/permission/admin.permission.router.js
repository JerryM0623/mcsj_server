const Router = require('koa-router');
const adminPermissionRouter = new Router({
    prefix:'/permission'
})

const permissionController = require('../../../controller/back/permission/permission.controller')

// 获取权限信息的接口
adminPermissionRouter.get('/all', permissionController.getAll);

module.exports = adminPermissionRouter