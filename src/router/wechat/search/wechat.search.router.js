const Router = require('koa-router');
const searchRouter = new Router({
    prefix: '/search'
})
const searchController = require('../../../controller/wechat/search/search.controller');

module.exports = searchRouter;