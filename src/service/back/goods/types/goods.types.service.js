const mcsjPool = require('../../../../db/mcsjPool');

class GoodsTypesService{
    async getByPage(pageNum, pageSize){
        try {
            const CountSql = `select COUNT(*) as total from mcsj_goods_types;`;
            const ListSql = `select t.id, s.name as seriesName, t.name, t.comment 
            from mcsj_goods_series as s, mcsj_goods_types as t 
            where series_id = s.id 
            limit ${ pageSize } 
            offset ${ pageSize * (pageNum - 1) };`;

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

module.exports = new GoodsTypesService()