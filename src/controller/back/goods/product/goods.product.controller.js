const GoodsProductService = require('../../../../service/back/goods/product/goods.product.service');
const client = require('../../../../utils/aliyun.oss.client');
const fs = require('fs');
const {v4 : uuidV4} = require('uuid');

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

    /**
     * 新增一个窗系列商品
     * @param ctx
     * @returns {Promise<void>}
     */
    async addWindow(ctx) {
        const file = ctx.request.files.file;
        // 错误
        if (Object.keys(ctx.request.body).length <= 0 || ! file){
            ctx.body = badBody;
            return;
        }
        try {
            // 获取文件后缀名
            const dotIndex = file.name.lastIndexOf('.');
            const extension = file.name.substr(dotIndex);

            // 床架 uuid
            const uuid = uuidV4();

            // 上传到 阿里云 oos
            const stream = fs.createReadStream(file.path);
            const putRes = await client.putStream(`/products/window/${ uuid }${ extension }`, stream);
            const img_url = putRes.url.replace('http', 'https');

            // 记录数据到 数据库
            const res = await GoodsProductService.addWindow(ctx.request.body, uuid, img_url);
            // 返回成功 或者 失败
            if (!res){
                errorBody.msg = '添加失败';
                ctx.body = errorBody;
            }else {
                successBody.msg = '添加成功';
                ctx.body = successBody;
            }
        }catch (e) {
            console.log(e)
            // 返回 error
            ctx.body = errorBody;
        }
    }
}

module.exports = new GoodsProductController();