const Router = require('koa-router');
const GoodsSeriesController = require('../../../../controller/back/goods/series/goods.series.controller');

const adminGoodsSeriesRouter = new Router({
    prefix: '/goods/series'
})

// 分页获取分页数据
adminGoodsSeriesRouter.get('/getSeriesByPageNum', GoodsSeriesController.getSeriesByPageNum);
// 获取全部数据
adminGoodsSeriesRouter.get('/getAllSeries', GoodsSeriesController.getAllSeries);
// 添加 series
adminGoodsSeriesRouter.post('/add', GoodsSeriesController.add);
// 编辑 series
adminGoodsSeriesRouter.post('/edit', GoodsSeriesController.edit);
// 删除 series
adminGoodsSeriesRouter.post('/delete', GoodsSeriesController.deleteOne);

module.exports = adminGoodsSeriesRouter;