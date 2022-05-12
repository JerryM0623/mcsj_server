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
// 获得订单的详细信息
orderRouter.get('/detail', orderController.getOrderDetailInfo);
// 将订单设置为已签收状态
orderRouter.post('/receive', orderController.changeOrderStatusToReceive);
// 将订单设置为申请退款状态
orderRouter.post('/refund', orderController.changeOrderStatusToRequestRefund);
// 删除订单记录
orderRouter.post('/delete', orderController.deleteOrder);
// 获取退款状态下的订单信息
orderRouter.get('/refund-order-list', orderController.getRefundOrderList);

module.exports = orderRouter;