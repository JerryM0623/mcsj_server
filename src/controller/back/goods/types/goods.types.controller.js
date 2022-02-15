const GoodsTypesService = require('../../../../service/back/goods/types/goods.types.service');

class GoodsTypesController {
    async getByPage(ctx) {
        const {pageNum, pageSize} = ctx.request.query;

        if (!pageNum || !pageSize) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }
        const {list, total} = await GoodsTypesService.getByPage(pageNum, pageSize);

        if (total < 0) {
            ctx.body = {
                code: 500,
                msg: '获取数据失败',
                data: ''
            }
        } else {
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
     * 添加新的类型
     * @param ctx
     * @returns {Promise<void>}
     */
    async addType(ctx) {
        const { seriesId, typeName, typeComment } = ctx.request.body;
        if (!seriesId || !typeName || !typeComment){
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }

        const res = await GoodsTypesService.addType(seriesId, typeName, typeComment);

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

    async editType(ctx) {

    }

    async deleteType(ctx) {

    }
}

module.exports = new GoodsTypesController();