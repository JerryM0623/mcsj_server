/* wechat 小程序端的所有接口 */
const Router = require('koa-router');

const weChatRouter = new Router({
    prefix:'/wechat'
})

const indexRouter = require('./wechat/index/wechat.index.router');
const registerRouter = require('./wechat/register/wechat.register.router');
const loginRouter = require('./wechat/login/wechat.login.router');
const locationRouter = require('./wechat/location/wechat.location.router');
const searchRouter = require('./wechat/search/wechat.search.router');

// 小程序首页的路由
weChatRouter.use(indexRouter.routes()).use(indexRouter.allowedMethods());
// 注册页面的路由
weChatRouter.use(registerRouter.routes()).use(registerRouter.allowedMethods());
// 小程序登录
weChatRouter.use(loginRouter.routes()).use(loginRouter.allowedMethods());
// 地址页面的路由
weChatRouter.use(locationRouter.routes()).use(locationRouter.allowedMethods());
// 搜索页面路由
weChatRouter.use(searchRouter.routes()).use(searchRouter.allowedMethods());


module.exports = weChatRouter;