const Router = require('koa-router');
const orderRouter = new Router({
    prefix: '/order'
})

const orderController = require('../../../controller/back/order/order.controller');

// 分页形式获取数据
orderRouter.get('/page', orderController.getOrderByPage);

module.exports = orderRouter;