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
            const ListSql = `select id, name, comment from mcsj_goods_series limit ${ pageSize } offset ${pageSize * ( pageNum - 1 )};`;

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
     * 添加一条新系列
     * @param seriesName
     * @param seriesComment
     * @returns {Promise<boolean>}
     */
    async add(seriesName, seriesComment) {
        try {
            const sql = `insert into mcsj_goods_series(name, comment) VALUE ('${ seriesName }', '${ seriesComment }');`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 编辑系列
     * @param seriesID
     * @param seriesName
     * @param seriesComment
     * @returns {Promise<boolean>}
     */
    async edit(seriesID, seriesName, seriesComment){
        try {
            const sql = `update mcsj_goods_series set name = '${ seriesName }', comment = '${ seriesComment }' where id = ${ seriesID };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 删除一条系列
     * @param seriesId
     * @returns {Promise<boolean>}
     */
    async deleteOne(seriesId){
        try {
            const sql = `delete from mcsj_goods_series where id = ${ seriesId };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new GoodsSeriesService();