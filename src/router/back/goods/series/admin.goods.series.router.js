const Router = require('koa-router');
const GoodsSeriesController = require('../../../../controller/back/goods/series/goods.series.controller');

const adminGoodsSeriesRouter = new Router({
    prefix: '/goods/series'
})

// 分页获取分页数据
adminGoodsSeriesRouter.get('/getSeriesByPageNum', GoodsSeriesController.getSeriesByPageNum);
// 添加 series
adminGoodsSeriesRouter.post('/add', GoodsSeriesController.add);
// 编辑 series
adminGoodsSeriesRouter.post('/edit', GoodsSeriesController.edit);

module.exports = adminGoodsSeriesRouter;