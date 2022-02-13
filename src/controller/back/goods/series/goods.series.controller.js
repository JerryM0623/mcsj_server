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
}

module.exports = new GoodsSeriesController();