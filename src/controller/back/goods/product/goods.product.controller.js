const GoodsProductService = require('../../../../service/back/goods/product/goods.product.service');


const getPageNumAndSize = (ctx) => {
    return {
        pageNum: ctx.request.query.pageNum,
        pageSize: ctx.request.query.pageSize,
    }
}
const checkPageNumAndPageSize = (obj) => {
    return (!obj.pageNum || !obj.pageSize)
}

const badBody = {
    code: 400,
    msg: '参数错误',
    data: ''
}
let errorBody = {
    code: 500,
    msg: '查询失败',
    data: ''
}
let successBody = {
    code: 200,
    msg: '查询成功',
    data: ''
}

class GoodsProductController {
    /**
     * window的分页获取接口
     * @param ctx
     * @returns {Promise<void>}
     */
    async windowGetByPageNum(ctx){
        if (!checkPageNumAndPageSize(getPageNumAndSize(ctx))){
            ctx.body = badBody;
            return;
        }
        const res = await GoodsProductService.windowGetByPageNum(ctx);
        if (!res){
            errorBody.msg = '查询失败';
            ctx.body = errorBody;
        }else {
            successBody.msg = '查询成功';
            successBody.data = res;
            ctx.body = successBody;
        }
    }

    async doorGetByPageNum(ctx){}
    async houseGetByPageNum(ctx){}
}

module.exports = new GoodsProductController();