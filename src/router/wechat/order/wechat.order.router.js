const Router = require('koa-router');
const orderRouter = new Router({
    prefix: '/order'
})
const orderController = require('../../../controller/wechat/order/order.controller');

// 创建订单
orderRouter.post('/create', orderController.createOrder);
// 修改订单为已支付
orderRouter.post('/paid', orderController.changeOrderStatusToPaid);
// 获得 当前userId的 订单数据
orderRouter.get('/list', orderController.getOrderList);

module.exports = orderRouter;