const Router = require('koa-router')
const categoryRouter = new Router({
    prefix: '/category'
})
const categoryController = require('../../../controller/wechat/category/category.controller');

// 获取全部系列
categoryRouter.get('/series', categoryController.getSeries);
// 获取全部类别
categoryRouter.get('/types', categoryController.getTypes);
// 根据 seriesId 和 typeId 获取对应的已上架商品的信息
categoryRouter.get('/series-type', categoryController.getSeriesTypeProductInfo)

module.exports = categoryRouter;