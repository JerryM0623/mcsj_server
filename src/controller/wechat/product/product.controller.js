const productService = require('../../../service/wechat/product/product.service');

class ProductController{
    async getInfomation(ctx){
        const { uuid } = ctx.query;
        if (uuid === undefined || uuid === null || uuid.trim().length === 0){
            ctx.body = {
                code: 10027,
                msg: '暂时无法查询数据，请稍后重试',
                data: ''
            }
            return;
        }

        const res = await productService.getInfomation(uuid);
        if (res.length === 0){
            ctx.body = {
                code: 10028,
                msg: '暂时无法查询数据，请稍后重试',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10029,
                msg: '获取信息成功',
                data: res[0]
            }
        }
    }
}

module.exports = new ProductController();