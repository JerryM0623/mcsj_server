const Router = require('koa-router');
const searchRouter = new Router({
    prefix: '/search'
})
const searchController = require('../../../controller/wechat/search/search.controller');

// 搜索
searchRouter.get('/search', searchController.search);

module.exports = searchRouter;