const Router = require('koa-router');
const GoodsProductController = require('../../../../controller/back/goods/product/goods.product.controller');

const adminGoodsProductRouter = new Router({
    prefix: '/goods/product'
})

// 分页获取商品的数据
adminGoodsProductRouter.get('/window/getByPage', GoodsProductController.windowGetByPageNum);
adminGoodsProductRouter.get('/door/getByPage', GoodsProductController.doorGetByPageNum);
adminGoodsProductRouter.get('/house/getByPage', GoodsProductController.houseGetByPageNum);

// 上下架商品
adminGoodsProductRouter.post('/window/changeStatus', GoodsProductController.changeWindowStatus);
adminGoodsProductRouter.post('/door/changeStatus', GoodsProductController.changeDoorStatus);
adminGoodsProductRouter.post('/house/changeStatus', GoodsProductController.changeHouseStatus);

module.exports = adminGoodsProductRouter