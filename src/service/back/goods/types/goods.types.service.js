const mcsjPool = require('../../../../db/mcsjPool');

class GoodsTypesService{
    /**
     * 分页获取数据
     * @param pageNum
     * @param pageSize
     * @returns {Promise<{total: number, list: []}|{total, list: *}>}
     */
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

    /**
     * 添加新的类型
     * @param seriesId
     * @param typeName
     * @param typeComment
     * @returns {Promise<boolean>}
     */
    async addType(seriesId, typeName, typeComment){
        try {
            const sql = `insert into mcsj_goods_types(series_id, name, comment) VALUE (${ seriesId }, '${ typeName }', '${ typeComment }');`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 编辑一条类型的信息
     * @param typeId
     * @param seriesId
     * @param typeName
     * @param typeComment
     * @returns {Promise<boolean>}
     */
    async editType(typeId, seriesId, typeName, typeComment){
        try {
            const sql = `update mcsj_goods_types set series_id = ${ seriesId }, name = '${ typeName }', comment = '${ typeComment }' where id = ${ typeId };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new GoodsTypesService()