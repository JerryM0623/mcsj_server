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
// 设置订单发货
orderRouter.post('/delivery', orderController.setOrderDelivery);
// 同意退款
orderRouter.post('/agree', orderController.agreeRefund);
// 拒绝退款
orderRouter.post('/reject', orderController.rejectRefund);

module.exports = orderRouter;