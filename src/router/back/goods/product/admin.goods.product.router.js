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

// 删除商品
adminGoodsProductRouter.post('/window/delete', GoodsProductController.deleteWindow);
adminGoodsProductRouter.post('/door/delete', GoodsProductController.deleteDoor);
adminGoodsProductRouter.post('/house/delete', GoodsProductController.deleteHouse);

// 添加商品
adminGoodsProductRouter.post('/window/add', GoodsProductController.addWindow);
adminGoodsProductRouter.post('/door/add', GoodsProductController.addDoor);
adminGoodsProductRouter.post('/house/add', GoodsProductController.addHouse);

// 编辑商品
adminGoodsProductRouter.post('/window/edit', GoodsProductController.editWindow);
adminGoodsProductRouter.post('/door/edit', GoodsProductController.editDoor);
adminGoodsProductRouter.post('/house/edit', GoodsProductController.editHouse);

module.exports = adminGoodsProductRouter