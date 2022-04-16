/* wechat 小程序端的所有接口 */
const Router = require('koa-router');

const weChatRouter = new Router({
    prefix:'/wechat'
})

const indexRouter = require('./wechat/index/wechat.index.router');
const registerRouter = require('./wechat/register/wechat.register.router');

// 小程序首页的路由
weChatRouter.use(indexRouter.routes()).use(indexRouter.allowedMethods());
// 注册页面的路由
weChatRouter.use(registerRouter.routes()).use(registerRouter.allowedMethods());


module.exports = weChatRouter;