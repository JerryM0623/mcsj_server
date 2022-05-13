const orderService = require('../../../service/back/order/order.service');

class OrderController{
    async getOrderByPage(ctx){
        const { pageNum, pageSize } = ctx.query;
        if (pageNum === null || pageNum === null || pageNum === '' || pageSize === null || pageSize === null || pageSize === ''){
            ctx.body = {
                code: 400,
                msg: '系统错误，请稍后重试',
                data: ''
            }
        }
        const res = await orderService.getOrderByPage(pageNum, pageSize);
        if (res.total === -1){
            ctx.body = {
                code: 500,
                msg: '暂无数据',
                data: []
            }
        }else{
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data: res
            }
        }
    }

    async getOrderLocation(ctx){
        const { orderId } = ctx.query;
        if (orderId === undefined || orderId === null || orderId <= 0){
            ctx.body = {
                code: 400,
                msg: '系统错误',
                data: ''
            }
        }
        const res = await orderService.getOrderLocation(orderId);
        if (res === {}){
            ctx.body = {
                code: 500,
                msg: '暂时无法查询',
                data: ''
            }
        }else{
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data: res
            }
        }
    }

    async setOrderLocation(ctx){
        const { orderId, locationName, locationPhone, location } = ctx.request.body;
        if (orderId === undefined || orderId === null || orderId <= 0 ||
            locationName === undefined || locationName === null || locationName === ''||
            locationPhone === undefined || locationPhone === null || locationPhone === ''||
            location === undefined || location === null || location === ''
        ){
            ctx.body = {
                code: 400,
                msg: '系统错误',
                data: ''
            }
        }

        const res = await orderService.setOrderLocation(orderId, locationName, locationPhone, location);
        if (!res){
            ctx.body = {
                code: 500,
                msg: '修改失败',
                data: ''
            }
        }else{
            ctx.body = {
                code: 200,
                msg: '修改成功',
                data: ''
            }
        }
    }

    async setOrderDelivery(ctx){
        const { orderId } = ctx.request.body;
        if (orderId === undefined || orderId === null || orderId < 0){
            ctx.body = {
                code: 400,
                msg: '系统错误',
                data: ''
            }
        }

        const res = await orderService.setOrderDelivery(orderId);
        if (!res){
            ctx.body = {
                code: 500,
                msg: '发货失败',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '发货成功',
                data: ''
            }
        }
    }
}

module.exports = new OrderController();