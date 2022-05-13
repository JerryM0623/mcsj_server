const Router = require('koa-router');
const orderRouter = new Router({
    prefix: '/order'
})

const orderController = require('../../../controller/back/order/order.controller');

// 分页形式获取数据
orderRouter.get('/page', orderController.getOrderByPage);
// 获取订单信息
orderRouter.get('/location', orderController.getOrderLocation);
// 修改订单信息
orderRouter.post('/set/location', orderController.setOrderLocation);

module.exports = orderRouter;