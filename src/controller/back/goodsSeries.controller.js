
const goodsSeriesService = require('../../service/back/goodsSeries.service');
class GoodsSeriesController {
    /**
     * 获取全部商品类型(门系列,窗系列...)
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAllGoodsTypes(ctx){
        try{
            const res = await goodsSeriesService.getAllGoodsTypes();
            if (res.length > 0){
                ctx.body = {
                    code:200,
                    msg:"查询商品类型成功",
                    data:res
                }
            }else{
                ctx.body = {
                    code:300,
                    msg:"暂无商品类型数据，请稍后重试",
                    data:""
                }
            }
        }catch (e) {
            console.log(e);
            ctx.body = {
                code:500,
                msg:"查询商品种类失败",
                data:""
            }
        }
    }

    /**
     * 获取全部商品的系列数据
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAllSeries(ctx) {
        try {
            // 查询数据库
            const res = await goodsSeriesService.getAllSeries();
            if (res.length > 0){
                ctx.body = {
                    code:200,
                    msg:"查询成功",
                    data:res
                }
            }else{
                ctx.body = {
                    code:300,
                    msg:"暂无数据，请稍后重试",
                    data:""
                }
            }
        }catch (e) {
            console.log(e);
            ctx.body = {
                code:500,
                msg:"查询失败",
                data:""
            }
        }
    }

    /**
     * 编辑一条系列的数据
     * @param ctx
     * @returns {Promise<void>}
     */
    async editSeries(ctx){
        const { id, series_name, type_name } = ctx.request.body;

        const res = await goodsSeriesService.editSeries(id, series_name, type_name);

        if (res){
            ctx.body = {
                code:200,
                msg:"修改成功",
                data:""
            }
        }else {
            ctx.body = {
                code:500,
                msg:"修改失败",
                data:""
            }
        }
    }

    /**
     * 添加一条系列
     * @param ctx
     * @returns {Promise<void>}
     */
    async addSeries(ctx){
        const { type_name, series_name } = ctx.request.body;
        // 请求
        const res = await goodsSeriesService.addSeries(type_name, series_name);
        if (res){
            ctx.body = {
                code:200,
                msg:"添加成功",
                data:""
            }
        }else {
            ctx.body = {
                code:500,
                msg:"添加失败",
                data:""
            }
        }
    }

    /**
     * 删除一条系列信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteSeries(ctx){
        const { id } = ctx.request.body;
        const res = await goodsSeriesService.deleteSeries(id);
        if (res){
            ctx.body = {
                code:200,
                msg:"删除成功",
                data:""
            }
        }else {
            ctx.body = {
                code:500,
                msg:"删除失败",
                data:""
            }
        }
    }
}

module.exports = new GoodsSeriesController();