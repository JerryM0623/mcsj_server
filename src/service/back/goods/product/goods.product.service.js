const mcsjPool = require('../../../../db/mcsjPool');

class GoodsProductService {
    /**
     * window的分页获取接口
     * @param ctx
     * @returns {Promise<{total: number, list: []}|{total, list: *}>}
     */
    async windowGetByPageNum(ctx) {
        try {
            const { pageSize, pageNum } = ctx.request.query;

            const CountSQL = `select COUNT(*) as total from mcsj_goods_product where series_id = 1;`;
            const selectSQL = `select p.id as id, p.uuid as uuid, t.name as typeName, p.name as name,
                                      p.comment_1 as commentOne, p.comment_2 as commentTwo, p.comment_3 as commentThree,
                                      p.origin_price as originPrice, p.sale_price as salePrice,
                                      p.img_url as imgUrl, p.is_hot as isHot,
                                      p.is_online as isOnline
                                from mcsj_goods_product as p, mcsj_goods_types as t
                                where p.series_id = 1 and p.type_id = t.id
                                limit ${ pageSize }
                                offset ${ pageSize * ( pageNum - 1 ) };`;

            const CountRes = await mcsjPool.execute(CountSQL);
            const selectRes = await mcsjPool.execute(selectSQL);

            return {
                total: CountRes[0][0].total,
                list: selectRes[0]
            }
        } catch (e) {
            console.log(e);
            return {
                list: [],
                total: -1
            }
        }
    }

}

module.exports = new GoodsProductService();