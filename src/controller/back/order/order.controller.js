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
}

module.exports = new OrderController();