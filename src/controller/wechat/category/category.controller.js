const categoryService = require('../../../service/wechat/categary/category.service');

class CategoryController{
    async getSeries(ctx){
        const res = await categoryService.getSeries();
        if (res .length === 0){
            ctx.body = {
                code: 10030,
                msg: '暂无数据',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10031,
                msg: '系列数据获取成功',
                data: res
            }
        }
    }

    async getTypes(ctx){
        const res = await categoryService.getTypes();
        if (res .length === 0){
            ctx.body = {
                code: 10032,
                msg: '暂无数据',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10033,
                msg: '类别数据获取成功',
                data: res
            }
        }
    }

    async getSeriesTypeProductInfo(ctx){
        const { seriesId, typeId } = ctx.query;
        if (seriesId === undefined || seriesId === null || seriesId === '' || typeId === undefined || typeId === null || typeId === ''){
            ctx.body = {
                code: 10034,
                msg: '参数错误，请重试',
                data: ''
            }
            return;
        }

        const res = await categoryService.getSeriesTypeProductInfo(seriesId, typeId);

        if (res.length === 0){
            ctx.body = {
                code: 10035,
                msg: '暂无商品数据',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10036,
                msg: '获取数据成功',
                data: res
            }
        }
    }
}
module.exports = new CategoryController();