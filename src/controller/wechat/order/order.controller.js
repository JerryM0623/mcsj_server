const orderService = require('../../../service/wechat/order/order.service');

class OrderController{
    /**
     * 创建订单
     * @param ctx
     * @returns {Promise<void>}
     */
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

    /**
     * 设置订单为已支付状态
     * @param ctx
     * @returns {Promise<void>}
     */
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

    /**
     * 获取订单列表
     * @param ctx
     * @returns {Promise<void>}
     */
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

    /**
     * 获取当个订单的详细信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getOrderDetailInfo(ctx){
        const{ orderId } = ctx.query;
        if (orderId === undefined || orderId === null || orderId === ''){
            ctx.body = {
                code: 10046,
                msg: '参数错误,请重试',
                data: ''
            }
            return;
        }

        const res = await orderService.getOrderDetailInfo(orderId);

        if (res.length === 0){
            ctx.body = {
                code: 10047,
                msg: '暂无数据',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10048,
                msg: '获取成功',
                data: res[0]
            }
        }
    }

    /**
     * 将订单设置为已签收状态
     * @param ctx
     * @returns {Promise<void>}
     */
    async changeOrderStatusToReceive(ctx){
        const{ orderId } = ctx.request.body;
        if (orderId === undefined || orderId === null || orderId === ''){
            ctx.body = {
                code: 10049,
                msg: '参数错误,请重试',
                data: ''
            }
            return;
        }
        const res = await orderService.changeOrderStatusToReceive(orderId);
        if (!res){
            ctx.body = {
                code: 10050,
                msg: '操作失败',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10051,
                msg: '签收成功',
                data: ''
            }
        }
    }

    /**
     * 将订单设置为申请退款阶段
     * @param ctx
     * @returns {Promise<void>}
     */
    async changeOrderStatusToRequestRefund(ctx){
        const{ orderId } = ctx.request.body;
        if (orderId === undefined || orderId === null || orderId === ''){
            ctx.body = {
                code: 10052,
                msg: '参数错误,请重试',
                data: ''
            }
            return;
        }
        const res = await orderService.changeOrderStatusToRequestRefund(orderId);
        if (!res){
            ctx.body = {
                code: 10053,
                msg: '操作失败',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10054,
                msg: '申请退款成功',
                data: ''
            }
        }
    }

    /**
     * 删除订单信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteOrder(ctx){
        const{ orderId } = ctx.request.body;
        if (orderId === undefined || orderId === null || orderId === ''){
            ctx.body = {
                code: 10055,
                msg: '参数错误,请重试',
                data: ''
            }
            return;
        }
        const res = await orderService.deleteOrder(orderId);
        if (!res){
            ctx.body = {
                code: 10056,
                msg: '删除失败',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10057,
                msg: '删除成功',
                data: ''
            }
        }
    }

    async getRefundOrderList(ctx){
        const{ userId } = ctx.query;
        if (userId === undefined || userId === null || userId === ''){
            ctx.body = {
                code: 10058,
                msg: '参数错误,请重试',
                data: ''
            }
            return;
        }

        const res = await orderService.getRefundOrderList(userId);

        if (res.length === 0){
            ctx.body = {
                code: 10059,
                msg: '暂无数据',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10060,
                msg: '获取成功',
                data: res
            }
        }
    }
}

module.exports = new OrderController();