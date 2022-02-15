const GoodsSeriesService = require('../../../../service/back/goods/series/goods.series.service');

class GoodsSeriesController {
    /**
     * 分页获取系列数据
     * @param ctx
     * @returns {Promise<void>}
     */
    async getSeriesByPageNum(ctx){
        const { pageNum, pageSize } = ctx.request.query;
        if (!pageNum || !pageSize) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }
        const { list, total } = await GoodsSeriesService.getSeriesByPageNum(pageNum, pageSize);

        if (total < 0){
            ctx.body = {
                code: 500,
                msg: '获取数据失败',
                data: ''
            }
        }else {
            const newArr = list.sort((prevItem, nextItem) => {
                return prevItem.id - nextItem.id;
            })
            ctx.body = {
                code: 200,
                msg: '获取数据成功',
                data: {
                    list: newArr,
                    total
                }
            }
        }
    }

    /**
     * 添加一条新系列
     * @param ctx
     * @returns {Promise<void>}
     */
    async add(ctx){
        const { seriesName, seriesComment } = ctx.request.body;
        if (!seriesName || !seriesComment){
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }

        const res = await GoodsSeriesService.add(seriesName, seriesComment);

        if (!res){
            ctx.body = {
                code: 500,
                msg: '添加失败',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data: ''
            }
        }
    }

    /**
     * 编辑系列
     * @param ctx
     * @returns {Promise<void>}
     */
    async edit(ctx){
        const { seriesName, seriesComment, seriesId } = ctx.request.body;
        if (!seriesName || !seriesComment || !seriesId){
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }

        const res = await GoodsSeriesService.edit(seriesId, seriesName, seriesComment);

        if (!res){
            ctx.body = {
                code: 500,
                msg: '修改失败',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '修改成功',
                data: ''
            }
        }
    }

    /**
     * 删除一条系列
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteOne(ctx){
        const { seriesId } = ctx.request.body;
        if (!seriesId){
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }

        const res = await GoodsSeriesService.deleteOne(seriesId);

        if (!res){
            ctx.body = {
                code: 500,
                msg: '删除失败',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '删除成功',
                data: ''
            }
        }
    }
}

module.exports = new GoodsSeriesController();