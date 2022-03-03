const GoodsTypesService = require('../../../../service/back/goods/types/goods.types.service');

class GoodsTypesController {
    /**
     * 分页查询全部的类型数据
     * @param ctx
     * @returns {Promise<void>}
     */
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
     * 查询 seriesId 下面的所有 type
     * @param ctx
     * @returns {Promise<void>}
     */
    async getBySeries(ctx){
        const { seriesId } = ctx.request.query;
        if (!seriesId || seriesId <= 0) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }

        const res = await GoodsTypesService.getBySeries(seriesId);
        if (res.length < 0) {
            ctx.body = {
                code: 400,
                msg: '查询失败',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data: res
            }
        }
    }

    /**
     * 添加新的类型
     * @param ctx
     * @returns {Promise<void>}
     */
    async addType(ctx) {
        const {seriesId, typeName, typeComment} = ctx.request.body;
        if (!seriesId || !typeName || !typeComment) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }

        const res = await GoodsTypesService.addType(seriesId, typeName, typeComment);

        if (!res) {
            ctx.body = {
                code: 500,
                msg: '添加失败',
                data: ''
            }
        } else {
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data: ''
            }
        }
    }

    /**
     * 编辑一条类型的信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async editType(ctx) {
        const {typeId, seriesId, typeName, typeComment} = ctx.request.body;
        if (!typeId || !seriesId || !typeName || !typeComment) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }

        const res = await GoodsTypesService.editType(typeId, seriesId, typeName, typeComment);

        if (!res) {
            ctx.body = {
                code: 500,
                msg: '修改失败',
                data: ''
            }
        } else {
            ctx.body = {
                code: 200,
                msg: '修改成功',
                data: ''
            }
        }
    }

    /**
     * 删除一条类型信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteType(ctx) {
        const {typeId} = ctx.request.body;
        if (!typeId) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }

        const res = await GoodsTypesService.deleteType(typeId);

        if (!res) {
            ctx.body = {
                code: 500,
                msg: '删除失败',
                data: ''
            }
        } else {
            ctx.body = {
                code: 200,
                msg: '删除成功',
                data: ''
            }
        }
    }
}

module.exports = new GoodsTypesController();