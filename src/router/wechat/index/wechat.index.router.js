const Router = require('koa-router');

const indexController = require('../../../controller/wechat/index/index.controller');

const indexRouter = new Router({
    prefix: '/index'
})

// 轮播图列表
indexRouter.get('/swiperList', indexController.getSwiperList);
// 精彩推荐列表
indexRouter.get('/recommendList', indexController.getRecommendList);

module.exports = indexRouter;