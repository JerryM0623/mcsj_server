const GoodsProductService = require('../../../../service/back/goods/product/goods.product.service');

const getPageNumAndSize = (ctx) => {
    return {
        pageNum: ctx.request.query.pageNum,
        pageSize: ctx.request.query.pageSize,
    }
}
const checkPageNumAndPageSize = (obj) => {
    return (!(!obj.pageNum || !obj.pageSize))
}

const getStatusAndId = (ctx) => {
    return {
        status: ctx.request.body.status,
        id: ctx.request.body.id
    }
}

const checkStatusAndId = (obj) => {
    const { status, id } = obj;
    const checkId = id <= 0 || id === undefined || id === null;
    const checkStatus = status < 0 || status > 1 || status === undefined || status === null
    return (!checkId && !checkStatus)
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

    /**
     * window的上下架接口
     * @param ctx
     * @returns {Promise<void>}
     */
    async changeWindowStatus(ctx){
        if (!checkStatusAndId(getStatusAndId(ctx))){
            ctx.body = badBody;
            return;
        }
        const res = await GoodsProductService.changeWindowStatus(getStatusAndId(ctx));
        if (!res){
            errorBody.msg = '操作失败';
            ctx.body = errorBody;
        }else {
            successBody.msg = '操作成功';
            ctx.body = successBody;
        }
    }
    async changeDoorStatus(ctx){}
    async changeHouseStatus(ctx){}

    async deleteWindow(ctx){
        const { id } = getStatusAndId(ctx);
        const checkId = id <= 0 || id === undefined || id === null;
        if (checkId){
            ctx.body = badBody;
            return;
        }
        const res = await GoodsProductService.deleteWindow(id);
        if (!res){
            errorBody.msg = '操作失败';
            ctx.body = errorBody;
        }else {
            successBody.msg = '操作成功';
            ctx.body = successBody;
        }
    }
    async deleteHouse(ctx){}
    async deleteDoor(ctx){}

    async addWindow(ctx) {
        // const { dialogMode, typeName, name,
        //     commentOne, commentTwo, commentThree,
        //     isHot, isOnline, originPrice, salePrice } = ctx.request.body;

        const file = ctx.request.files.file;

        console.log(ctx.request.body);
        console.log(file);

        ctx.body = successBody;

        /*
        * todo: 以实现前端数据传递至后端。
        *  1. 后端处理数据，创建一个 uuid 并将传入的图片重命名为该 uuid， 上传至阿里云 oss 对象存储中。
        *  2. 在上传成功之后，将对应的数据存入数据库中。
        *  3. 任何一部出现错误，返回 error
        *  4. 全部输入正确返回 success。
        */

    }
}

module.exports = new GoodsProductController();