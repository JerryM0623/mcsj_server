const mcsjPool = require('../../../../db/mcsjPool');

class GoodsSeriesService{
    /**
     * 分页获取系列数据
     * @param pageNum
     * @param pageSize
     * @returns {Promise<{total: number, list: []}|{total, list: *}>}
     */
    async getSeriesByPageNum(pageNum, pageSize){
        try {
            const CountSql = `select COUNT(*) as total from mcsj_goods_series;`;
            const ListSql = `select id, name from mcsj_goods_series limit ${ pageSize } offset ${pageSize * ( pageNum - 1 )};`;

            const CountRes = await mcsjPool.execute(CountSql);
            const ListRes = await mcsjPool.execute(ListSql);

            return {
                list: ListRes[0],
                total: CountRes[0][0].total
            }

        }catch (e) {
            console.log(e);
            return {
                list: [],
                total: -1
            }
        }
    }
}

module.exports = new GoodsSeriesService();