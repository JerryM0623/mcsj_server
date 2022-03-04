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

    /**
     * door的分页获取接口
     * @param ctx
     * @returns {Promise<void>}
     */
    async doorGetByPageNum(ctx){
        if (!checkPageNumAndPageSize(getPageNumAndSize(ctx))){
            ctx.body = badBody;
            return;
        }
        const res = await GoodsProductService.doorGetByPageNum(ctx);
        if (!res){
            errorBody.msg = '查询失败';
            ctx.body = errorBody;
        }else {
            successBody.msg = '查询成功';
            successBody.data = res;
            ctx.body = successBody;
        }
    }
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

            // 创建 uuid
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

    /**
     * 编辑一个窗户的接口
     * @param ctx
     * @returns {Promise<void>}
     */
    async editWindow(ctx){
        // 错误
        if (Object.keys(ctx.request.body).length <= 0){
            ctx.body = badBody;
            return;
        }
        /**
         * uuid 在新建的时候出现，新建之后的所有操作都不能更改 uuid 只能将 uuid 当作唯一标识符进行使用
         */
        try {
            console.log(ctx.request.body);
            // 获取 uuid 和 后缀
            const url = await GoodsProductService.getPicUrl(ctx.request.body.id);
            const lastSlashIndex = url.lastIndexOf('/');
            const lastDotIndex = url.lastIndexOf('.');

            const uuid = url.substr(lastSlashIndex + 1, 36); // uuid是32个字符组成的，加上中间的四个 - 最终为36位
            const extension = url.substr(lastDotIndex);
            console.log('获取 uuid 和 后缀信息 成功');

            // 如果有传递图片文件，需要进行图片的更新
            if (ctx.request.files.file) {
                // 删除云端的图片数据
                await client.delete(`/products/window/${uuid}${extension}`);
                console.log('删除云端文件成功');

                // 上传新的图片数据
                const stream = fs.createReadStream(ctx.request.files.file.path);
                const putRes = await client.putStream(`/products/window/${uuid}${extension}`, stream);
                console.log('上传文件成功');
                const imgUrl = putRes.url.replace('http', 'https');

                // 更新数据库
                const updatePicRes = await GoodsProductService.updatePicUrl(imgUrl, uuid);
                if (!updatePicRes){
                    errorBody.msg = '操作失败';
                    ctx.body = errorBody;
                }
            }

            // 更新非图片之外的数据
            const updateWindowRes = await GoodsProductService.updateWindow(ctx.request.body, uuid);
            if (!updateWindowRes){
                console.log('---------------------------');
                errorBody.msg = '操作失败';
                ctx.body = errorBody;
            }else {
                console.log('---------------------------');
                successBody.msg = '操作成功';
                ctx.body = successBody;
            }
        }catch (e) {
            console.log(e);
            console.log('---------------------------');
            errorBody.msg = '请求错误';
            ctx.body = errorBody;
        }
    }
}
module.exports = new GoodsProductController();