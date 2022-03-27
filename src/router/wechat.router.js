/* wechat 小程序端的所有接口 */
const Router = require('koa-router');

const weChatRouter = new Router({
    prefix:'/wechat'
})

const indexRouter = require('./wechat/index/wechat.index.router');

// 小程序首页的数据
weChatRouter.use(indexRouter.routes()).use(indexRouter.allowedMethods());

module.exports = weChatRouter;