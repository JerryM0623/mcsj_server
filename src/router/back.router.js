/* admin 网页端的所有接口 */
const Router = require('koa-router');

const adminLoginRouter = require('./back/login/admin.login.router');
const adminAccountRouter = require('./back/account/admin.account.router');
const adminCarouselRouter = require('./back/carousel/admin.carousel.router');
const adminPermissionRouter = require('./back/permission/admin.permission.router');
const adminRoleRouter = require('./back/role/admin.role.router');

const backRouter = new Router({
    prefix:'/admin'
})

// 配置登录接口
backRouter.use(adminLoginRouter.routes()).use(adminLoginRouter.allowedMethods());
// 配置账户管理接口
backRouter.use(adminAccountRouter.routes()).use(adminAccountRouter.allowedMethods());
// 配置轮播图管理的接口
backRouter.use(adminCarouselRouter.routes()).use(adminCarouselRouter.allowedMethods());
// 配置权限管理的接口
backRouter.use(adminPermissionRouter.routes()).use(adminPermissionRouter.allowedMethods());
// 配置角色控制的管理的接口
backRouter.use(adminRoleRouter.routes()).use(adminRoleRouter.allowedMethods());

module.exports = backRouter;