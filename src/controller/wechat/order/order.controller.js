const orderService = require('../../../service/wechat/order/order.service');

class OrderController{
    async createOrder(ctx){
        const { userId, locationId, productId, buyNumber, buyPrice } = ctx.request.body;
        if (userId === undefined || userId === null || userId === '' ||
        locationId === undefined || locationId === null || locationId === '' ||
        productId === undefined || productId === null || productId === '' ||
        buyNumber === undefined || buyNumber === null || buyNumber === '' ||
        buyPrice === undefined || buyPrice === null || buyPrice === ''){
            ctx.body = {
                code: 10037,
                msg: '请求失败,请重试',
                data: ''
            }
            return;
        }
        const res = await orderService.createOrder(ctx.request.body);
        if (!res){
            ctx.body = {
                code: 10038,
                msg: '创建订单失败',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10039,
                msg: '创建订单成功',
                data: res
            }
        }
    }

    async changeOrderStatusToPaid(ctx){
        const { orderId } = ctx.request.body;
        if (orderId === undefined || orderId === null || orderId === ''){
            ctx.body = {
                code: 10040,
                msg: '请求失败,请重试',
                data: ''
            }
            return;
        }
        const res = await orderService.changeOrderStatusToPaid(orderId);
        if (!res){
            ctx.body = {
                code: 10041,
                msg: '支付失败',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10042,
                msg: '支付成功',
                data: ''
            }
        }
    }

    async getOrderList(ctx){
        const{ userId } = ctx.query;
        if (userId === undefined || userId === null || userId === ''){
            ctx.body = {
                code: 10043,
                msg: '参数错误,请重试',
                data: ''
            }
            return;
        }

        const res = await orderService.getOrderList(userId);

        if (res.length === 0){
            ctx.body = {
                code: 10044,
                msg: '暂无数据',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10045,
                msg: '获取成功',
                data: res
            }
        }
    }
}

module.exports = new OrderController();