const Router = require('koa-router');

const goodsSeriesController = require('../../../controller/back/goodsSeries.controller');

const adminGoodsSeriesRouter = new Router({
    prefix:'/series'
})

// 获取所有的 goodsTypes
adminGoodsSeriesRouter.get('/allType', goodsSeriesController.getAllGoodsTypes);
// 获取所有的 series
adminGoodsSeriesRouter.get('/all', goodsSeriesController.getAllSeries);
// 编辑一条系列
adminGoodsSeriesRouter.post('/edit', goodsSeriesController.editSeries);
// 添加一条系列
adminGoodsSeriesRouter.post('/add', goodsSeriesController.addSeries);
// 删除一条系列
adminGoodsSeriesRouter.post('/delete', goodsSeriesController.deleteSeries);

module.exports = adminGoodsSeriesRouter